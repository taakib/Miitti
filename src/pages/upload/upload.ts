import {Component} from '@angular/core';
import {
  IonicPage, NavController,
  NavParams,
} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {Media} from '../../models/media';
import {HomePage} from '../home/home';
import { Data } from '../../providers/data/data';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  media: Media = {
    title: '',
    description: '',
  };

  file: File;
  sports: any;
  searchTerm: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public dataService: Data) {
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  startUpload() {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);

    this.mediaProvider.postUserFile(formData).subscribe(response => {
      console.log(response);
      const fileId = response['file_id'];
      const tagContent = {
        file_id: fileId,
        tag: 'Miitti',
      };
      this.mediaProvider.postTag(tagContent, localStorage.getItem('token')).
        subscribe(response => {
          setTimeout(() => {
            this.dataService.presentAlert('Submitted', 'Your activity was submitted successfully!');
            this.navCtrl.setRoot(UploadPage);
          }, 1500);
        }, (tagError: HttpErrorResponse) => {
          console.log(tagError);
          this.dataService.presentAlert('Error', 'There was an error in upload!');
        });
    }, (error: HttpErrorResponse) => {
      this.dataService.presentAlert('Error', 'There was an error in upload!');
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.sports = this.dataService.filterItems(this.searchTerm);
  }

}
