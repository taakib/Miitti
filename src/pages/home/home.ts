import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import {SinglePage} from '../single/single';

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

  mediaArray: Array<string>;
  grid: Array<Array<string>>; //array of arrays

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  openSingle(id) {
    this.navCtrl.push(SinglePage, {
      mediaID: id,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData(localStorage.getItem('token')).
        subscribe(response => {
          this.mediaProvider.loggedIn = true;
          localStorage.setItem('user', JSON.stringify(response));
        }, (error: HttpErrorResponse) => {
          console.log(error);
          this.navCtrl.setRoot(LoginPage);
        });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

    this.mediaProvider.getAllMedia().subscribe(data => {
      console.log(data);
      this.mediaArray = data;
      this.grid = Array(Math.ceil(this.mediaArray.length / 2)); //MATHS!
      console.log(this.grid);
      let rowNum = 0; //counter to iterate over the rows in the grid

      for (let i = 0; i < this.mediaArray.length; i += 2) { //iterate images

        this.grid[rowNum] = Array(2); //declare two elements per row

        if (this.mediaArray[i]) { //check file URI exists
          this.grid[rowNum][0] = this.mediaArray[i]; //insert image
        }

        if (this.mediaArray[i + 1]) { //repeat for the second image
          this.grid[rowNum][1] = this.mediaArray[i + 1];
        }

        rowNum++; //go on to the next row
      }
      console.log(this.grid);
    });
  }
}
