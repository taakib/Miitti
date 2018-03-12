import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import set = Reflect.set;
import {RegisterPage} from '../register/register';

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

  username: string;
  userInfo: any;
  userMedia: Array<string>;
  mediaGrid: Array<Array<string>>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, public http: HttpClient) {
  }

  public logout() {
    localStorage.removeItem('token');
    console.log('User ' + this.username + ' logged out.');
    this.navCtrl.setRoot(RegisterPage);
  }

  ionViewDidLoad() {
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData(localStorage.getItem('token')).subscribe(response => {
        this.userInfo = response;
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('user', JSON.stringify(response));
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.navCtrl.setRoot(LoginPage);
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

    this.mediaProvider.getPostsByUser(localStorage.getItem('token'))
      .subscribe( response => {
        this.userMedia = response;
        console.log(response);
        this.userMedia.reverse();
        this.mediaGrid = Array(Math.ceil(this.userMedia.length)); //MATHS!
        console.log(this.mediaGrid);
        let rowNum = 0; //counter to iterate over the rows in the grid

        for (let i = 0; i < this.userMedia.length; i += 2) { //iterate imgs

          this.mediaGrid[rowNum] = Array(1); //declare two elements per row

          if (this.userMedia[i]) { //check file URI exists
            this.mediaGrid[rowNum][0] = this.userMedia[i]; //insert image
          }

          if (this.userMedia[i + 1]) { //repeat for the second image
            this.mediaGrid[rowNum][1] = this.userMedia[i + 1];
          }

          rowNum++; //go on to the next row
        }
        console.log(this.mediaGrid);
      });

  }

}
