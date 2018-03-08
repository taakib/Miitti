import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  IonicApp, IonicModule, IonicErrorHandler,
} from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MediaProvider } from '../providers/media/media';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {ProfilePage} from '../pages/profile/profile';
import {UploadPage} from '../pages/upload/upload';
import {CategoriesPage} from '../pages/categories/categories';
import {HttpClientModule} from '@angular/common/http';
import {PipesModule} from '../pipes/pipes.module';
import {MediaplayerPage} from '../pages/mediaplayer/mediaplayer';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {SinglePage} from '../pages/single/single';
import {FormsModule} from '@angular/forms';
import {MapProvider} from '../providers/map/map';
import {CategoriesPageModule} from '../pages/categories/categories.module';
import {HomePageModule} from '../pages/home/home.module';
import { Data } from '../providers/data/data';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    MediaplayerPage,
    SinglePage,
    CategoriesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    PipesModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    MediaplayerPage,
    SinglePage,
    CategoriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MediaProvider,
    MapProvider,
    PhotoViewer,
    Data,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
