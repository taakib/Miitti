import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HomePage} from '../home/home';
import {User} from '../../models/user';
import {RegisterPage} from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user: User = {username: null};

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public doLogin(): void {
    console.log(this.user);
    this.mediaProvider.login(this.user).subscribe(data => {
      console.log(data);
      this.mediaProvider.loggedIn = true;
      localStorage.setItem('token', data.token);
      this.navCtrl.setRoot(HomePage);
    }, error => {
      console.log(error);
    });
  }

}
