import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {MapProvider} from '../../providers/map/map';
import {User} from '../../models/user';
import {Comment} from '../../models/comment';

/**
 * Generated class for the SinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {
  url: string;
  title: string;
  description: string;
  //latLon: any;
  tags: '';
  userID: any;
  file_id: any;
  username: any;
  commenter: any;
  message = '';
  user: User;

  commentData: Comment = {
    file_id: "",
    comment: ""
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public mapProvider: MapProvider,
    private photoViewer: PhotoViewer) {
  }

  showImage() {
    this.photoViewer.show(this.url, this.title, {share: false});
  }

  getUser(id: number) {
    this.mediaProvider.getUserInformation(localStorage.getItem('token'), id)
      .subscribe(data => {
      this.commenter = data;
      return this.commenter.username;
    });
  }


  addComment() {
    this.commentData.file_id = this.file_id;
    this.mediaProvider.postComment(localStorage.getItem('token'), this.commentData)
    .subscribe(response => {
      //this.refresh();
      document.forms["commentForm"].reset();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');
    console.log(this.navParams.get('mediaID'));
    this.mediaProvider.getSingleMedia(this.navParams.get('mediaID')).
      subscribe(response => {
        console.log(response);
        this.url = this.mediaProvider.mediaUrl + response['filename'];
        this.title = response['title'];
        this.description = response['description'];
        this.userID = response['user_id'];
        this.mediaProvider.getTagByFile(response['file_id']).
          subscribe(response => {
            console.log(response);
            response.forEach(t => {
              console.log(t['tag']);
              this.tags = t['tag'];
              this.mediaProvider.getUserData(localStorage.getItem('token'))
                .subscribe( response => {
                  this.username = response['username'];
              })

              /*
            if (response.length === 0) this.message = 'No tags';
            response.forEach(t => {
              //const tag = JSON.parse(t['tag']);
              console.log(t['tag']);
              this.tags = t['tag'];

              if (tag.name === 'latLon') {
                this.latLon = tag.value;
              } else {
                return;
              }
              console.log(this.latLon);
              if (this.latLon === undefined) {
                this.message = 'No EXIF data';
              } else {
                this.mapProvider.loadMap('map_canvas', this.latLon);
              }
            */
            });

          });
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
