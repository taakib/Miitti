import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../models/user';
import {HomePage} from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  login: boolean = true;

  user: User = {
    username: '',
    password: '',
    email: '',
  };

  constructor(
    private navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

 /* public createAccount() {
    this.navCtrl.push('LoginPage');
  }
*/
  register() {
    console.log(this.user);

    this.mediaProvider.register(this.user).
      subscribe(response => {
        console.log(response);
        this.mediaProvider.username = this.user.username;
        this.mediaProvider.password = this.user.password;
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
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

  public checkForm () {
    return this.login;
  }

  public changeForm() {
    this.login = !this.login;
  }

}
