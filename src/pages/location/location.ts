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
  MyLocation
} from '@ionic-native/google-maps';

//declare var google; 

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  mapReady: boolean = false;
  map: GoogleMap;
  showMap: boolean = false;
  longtitude: number;
  latitude: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.loadMap();
  }

  currentLocation() {
    this.showMap = true;

    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        })
      }).then((marker: Marker) => {
        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showToast('clicked!');
        });
      });
  }

  customLocation() {

  }

  loadMap() {

    this.map = GoogleMaps.create('map-canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
    });
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