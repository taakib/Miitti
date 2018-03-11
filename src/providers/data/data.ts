import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

  sports: any;
  searchTerm: string = '';

  constructor(public http: Http) {

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
}
