import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

declare var google;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  map: GoogleMap;
  showMap: boolean = false;
  longtitude: number;
  latitude: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {

  }

  ionViewDidLoad() {

  }

  currentLocation() {
    this.showMap = true;
    console.log('ionViewDidLoad LocationPage');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(" Your location is ===== " + resp.coords.latitude + "," + resp.coords.longitude);
      this.longtitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      this.loadMap();
    }).catch((error) => {
      console.log('Error getting location');
      console.dir(error);
    });
  }

  customLocation() {

  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.longtitude,
          lng: this.latitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Your Location',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: this.longtitude,
            lng: this.latitude
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MAP_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

}
