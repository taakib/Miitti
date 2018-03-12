import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from 'ionic-angular';

@Injectable()
export class Data {

  sports: any;
  searchTerm: string = '';

  constructor(public http: Http, private alertCtrl: AlertController) {

    this.sports = [
      {title: 'Football'},
      {title: 'Ice Hockey'},
      {title: 'Discgolf'},
      {title: 'Tennis'},
      {title: 'Basketball'},
      {title: 'Running'},
      {title: 'Skateboarding'},
      {title: 'Boxing'},
      {title: 'Cycling'},
      {title: 'Badminton'},
      {title: 'Snowboarding'},
    ]

  }

  filterItems(searchTerm){
    return this.sports.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  public presentAlert(title, infoText) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: infoText,
        buttons: ['Dismiss']
      });
      alert.present();
    }
}
