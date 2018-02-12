import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  files: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad HomePage');
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData().subscribe(response => {
        /**
         * Hakee 10 uusinta tiedostoa jos login menee läpi
         */
        this.mediaProvider.getNewFiles().subscribe( data => {
          this.files = data;
        })
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.navCtrl.setRoot(LoginPage);
    });
    } else {
      console.log('No cookie found! Returning to login screen');
      this.navCtrl.setRoot(LoginPage);
    }

  }

}
