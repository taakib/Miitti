import { Component } from '@angular/core';
import {UploadPage} from '../upload/upload';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';
import {MediaplayerPage} from '../mediaplayer/mediaplayer';
import {ProfilePage} from '../profile/profile';
import {CategoriesPage} from '../categories/categories';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UploadPage;
  tab3Root = RegisterPage;
  tab4Root = ProfilePage;
  tab5Root = CategoriesPage;

  constructor() {

  }
}
