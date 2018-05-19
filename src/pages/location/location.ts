import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  MyLocation,
  LatLng
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  mapReady: boolean = false;
  map: GoogleMap;
  showMap: boolean = false;
  locations: Array<any> = [
    { key: 'Current Location', value: 'current', latlng: '' },
    { key: 'Amman', value: 'amm', latlng: { lat: 31.8354533, lng: 35.6674418 } },
    { key: 'Irbid', value: 'irb', latlng: new LatLng(32.5525113,35.81239) },
    { key: 'Zarqa', value: 'zar', latlng: new LatLng(32.0522945,35.9935951) },
    { key: 'As-Salt', value: 'sal', latlng: new LatLng(32.0321557,35.655972) }
  ];
  selectedOption: any = this.locations[0];


  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  currentLocation() {
    console.log(" Getting current loaction ...... ");
    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    this.map.getMyLocation().then((location: MyLocation) => {
      return this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      }).then(() => {
        console.log(" ======= We found your location ......");
      });

    }).catch((error) => {
      console.error(" Can't get your current position, make sure that GPS is ON ... ");
    });
  }

  gotoSpecificLocation(latlng: LatLng) {
    console.log(" Goto to loaction ...... ");
    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    return this.map.animateCamera({
      target: latlng,
      zoom: 11,
      tilt: 10
    }).then(() => {
      console.log(" ======= We found your location ......");
    });


  }


  loadMap() {
    this.showMap = true;
    this.map = GoogleMaps.create('map-canvas', {
      camera: {
        target: {
          lat: 34.8783629,
          lng: 31.2603797
        },
        zoom: 10,
        tilt: 10
      }
    });
    this.map.setMyLocationEnabled(true);
    this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
  }

  onMapReady() {
    console.log('map is ready!');
    this.mapReady = true;
    if (this.selectedOption.value == 'current') {
      this.currentLocation();
    } else {
      this.gotoSpecificLocation(this.selectedOption.latLng);
    }

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