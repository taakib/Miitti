import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, public http: HttpClient) {
  }

  ionViewDidLoad() {
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData(localStorage.getItem('token')).
      subscribe(response => {
        this.userInfo = response;
        this.mediaProvider.loggedIn = true;
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.navCtrl.setRoot(LoginPage);
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
