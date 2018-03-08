import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

 openCategory() {
    this.navCtrl.push(HomePage);
  }
}
