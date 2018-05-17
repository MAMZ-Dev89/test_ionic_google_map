import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  MyLocationOptions,
  LocationService
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  mapReady: boolean = false;
  map: GoogleMap;
  longtitude: number;
  latitude: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private geoLoc: Geolocation) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.loadMap();
  }

  currentLocation() {
    console.log(" Getting my loaction ...... ");

    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    let options: MyLocationOptions = {
      enableHighAccuracy: true
    };


    this.geoLoc.getCurrentPosition().then((position: Geoposition) => {
      return this.map.animateCamera({
        target: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 17,
        tilt: 30
      }).then(() => {
        console.log(" ======= We found your location ......");
      });

      //    return this.map.animateCamera({

      //   }).then(() => {
      //     // add a marker
      //     return this.map.addMarker({
      //       title: '@ionic-native/google-maps plugin!',
      //       snippet: 'This plugin is awesome!',
      //       position: location.latLng,
      //       animation: GoogleMapsAnimation.BOUNCE
      //     });
      //   })
      // }


    }).catch((error) => {
      console.error(" Can't get your current position, make sure that GPS is ON ... ");
    });

    // Get the location of you
    // this.map.getMyLocation().then((location: MyLocation) => {
    //     console.log(" ================ ",JSON.stringify(location));

    //     // Move the map camera to the location with animation

  }

  customLocation() {

  }

  loadMap() {

    this.map = GoogleMaps.create('map-canvas', {
      camera: {
        target: {
          lat: 31.8354533,
          lng: 35.6674418
        },
        zoom: 10,
        tilt: 10
      }
    });
    this.map.setMyLocationEnabled(true);
    //this.map.setMyLocationButtonEnabled(true);

    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
  }

  onMapReady() {
    console.log('map is ready!');
    this.mapReady = true;
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }


}