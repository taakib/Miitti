import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaplayerPage } from './mediaplayer';

@NgModule({
  declarations: [
    MediaplayerPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaplayerPage),
  ],
})
export class MediaplayerPageModule {}
