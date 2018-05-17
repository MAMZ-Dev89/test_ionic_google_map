import { GoogleMaps } from '@ionic-native/google-maps';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';

@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
  ],
  providers: [
    GoogleMaps
  ]
})
export class LocationPageModule { }
