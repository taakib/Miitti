import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {MapProvider} from '../../providers/map/map';
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
  tags: any;
  userID: any;
  file_id: any;
  username: any;
  message = '';
  comment: string;
  commentsLoaded: boolean;
  currentUserName: string;
  myId: number;
  commentArray: any;
  likeInfo = '';
  mediaID = this.navParams.get('mediaID');
  attendCount = 0;
  liked: boolean;

  userInfo: any = '';

  commentData: Comment = {
    file_id: "",
    comment: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public mapProvider: MapProvider,
    private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    this.loadMedia();
    this.currentUser();
    console.log(this.commentsLoaded + ' 1');
    console.log('ionViewDidLoad SinglePage');
    console.log(this.navParams.get('mediaID'));
  }

  showImage() {
    this.photoViewer.show(this.url, this.title, {share: false});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  currentUser() {

    this.mediaProvider.getUserData(localStorage.getItem('token'))
    .subscribe(user => {

        this.currentUserName = user['username'];
        this.myId = user['user_id'];

      }, (getUserError: HttpErrorResponse) => {
        console.log(getUserError);
      }
    )
  }

  pushComment(){

    this.commentData.file_id = this.mediaID;

    this.mediaProvider.postComment(this.commentData, localStorage.getItem('token'))
    .subscribe(response => {
      console.log(response);
      console.log(this.commentData);
      document.getElementById('comment').innerText = '';
      this.loadMedia();
    });

  }

  loadMedia(){
    this.commentsLoaded = false;
    this.liked = false;

    this.mediaProvider.getSingleMedia(this.mediaID).
      subscribe(response => {
        console.log(response);
        this.url = this.mediaProvider.mediaUrl + response['filename'];
        this.title = response['title'];
        this.description = response ['description'];
        this.userID = response ['user_id'];
        this.file_id = response['file_id'];


        this.mediaProvider.getUserInformationById(this.userID, localStorage.getItem('token'))
        .subscribe( result => {
          this.username = result['username'];

          this.mediaProvider.getTagByFile(this.file_id).
            subscribe(response => {
              //console.log(response);
              this.loadComments();
              console.log(response[0]);

              if (response.length === 0) {
                this.tags = 'No tags';
              } else {
                this.tags = response;
                for (let i = 0; i < this.tags.length; i++){
                  if (this.tags[i].tag === 'geopic') {
                    this.tags.splice(i, 1);
                  }

                }
                console.log(this.tags);
              }


            });

        }, (error: HttpErrorResponse) => {
          console.log(error);
        });

      });

  }



  loadComments() {

    this.mediaProvider.getCommentsByFile(this.mediaID).subscribe(data => {
      console.log(data);
      this.commentArray = data;

      this.commentArray['user_id'];

      if (this.commentArray.length != 0){

        this.commentArray.map(com => {

          this.mediaProvider.getUserInformationById(com.user_id, localStorage.getItem('token')).subscribe(response => {

            com.user = response;

            console.log(com.user['username']);

            this.countAttending();


          });
        });
      } else {
        this.countAttending();
      }
    });
  }

  countAttending () {
    this.mediaProvider.getAttending(this.mediaID).subscribe(AttendingCount => {
      this.attendCount = Object.keys(AttendingCount).length;
      console.log(AttendingCount);
      console.log(this.userID);
      this.commentsLoaded = true;
      console.log('likes ' + this.attendCount);

      for (let i = 0; i < this.attendCount; i++) {
        if (AttendingCount[i].user_id === this.myId) {
          this.likeInfo = ' , you like this';
          this.liked = true;
        } else {
          this.likeInfo = ' , you don´t like this';
          this.liked = false;
        }
      }
    });
  }

  addToFavourites (id) {

    const file_id = {
      file_id: id
    };

    console.log(file_id);

    this.mediaProvider.postAttending(file_id, localStorage.getItem('token'))
    .subscribe( favourite => {
      this.countAttending();
      this.liked = true;
      console.log(favourite);
    },(error: HttpErrorResponse) => {
        console.log(error);
      });
    }

}

