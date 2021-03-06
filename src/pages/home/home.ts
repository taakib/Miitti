import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import {SinglePage} from '../single/single';
import {RegisterPage} from '../register/register';
import { Data } from '../../providers/data/data';


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

  tabBarElement: any;
  splash = true;
  mediaArray: Array<string>;
  grid: Array<Array<string>>; //array of arrays

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public dataService: Data) {
    this.tabBarElement = document.querySelector('.tabbar');
  }

  openSingle(id) {
    this.navCtrl.push(SinglePage, {
      mediaID: id,
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.drawGrid();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  postAttending(id) {
    const file_id = {
      file_id: id,
    };
    console.log(file_id);

    this.mediaProvider.postAttending(localStorage.getItem('token'), file_id)
    .subscribe(response => {
      console.log(response);
      this.dataService.presentAlert('Attended!', 'You successfully signed up for this activity.');
    }, (error: HttpErrorResponse) => {
      this.dataService.presentAlert('Error', 'You are already attending this activity!');
      console.log(error)
    });

  }

  drawGrid() {
    this.mediaProvider.getPostByTag().subscribe(data => {
      console.log(data);
      this.mediaArray = data;
      this.mediaArray.reverse();
      this.grid = Array(Math.ceil(this.mediaArray.length)); //MATHS!
      console.log(this.grid);
      let rowNum = 0; //counter to iterate over the rows in the grid

      for (let i = 0; i < this.mediaArray.length; i += 2) { //iterate imgs

        this.grid[rowNum] = Array(1); //declare two elements per row

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

  ionViewDidLoad() {
    console.log('Refreshing HomePage');
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.tabBarElement.style.display = 'flex';
      this.splash = false;
    }, 4000);

    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData(localStorage.getItem('token')).
        subscribe(response => {
          this.mediaProvider.loggedIn = true;
          localStorage.setItem('user', JSON.stringify(response));
        }, (error: HttpErrorResponse) => {
          console.log(error);
          this.navCtrl.setRoot(RegisterPage);
        });
    } else {
      this.navCtrl.setRoot(RegisterPage);
    }
    this.drawGrid();

  }

  public logout() {
    localStorage.removeItem('token');
    this.navCtrl.setRoot(RegisterPage);
  }

}
