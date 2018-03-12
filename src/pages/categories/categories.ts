import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import { Data } from '../../providers/data/data';
import {RegisterPage} from '../register/register';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  sports: any;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {


  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.sports = this.dataService.filterItems(this.searchTerm);
  }

 openCategory() {
    this.navCtrl.push(HomePage);
  }


  public logout() {
    localStorage.removeItem('token');
    this.navCtrl.setRoot(RegisterPage);
  }

}
