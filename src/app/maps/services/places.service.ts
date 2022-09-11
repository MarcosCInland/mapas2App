import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from './../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapsService } from './maps.service';
//import PlacesResponse from './../interfaces/places'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] = [-90.54694577834591, 14.684779898165859];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation; //no hay valor, y lo niega
  }
  
  constructor(private placesApi: PlacesApiClient, private mapService: MapsService) { 
    this.getUserLocation();
   }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition( ({coords})=> {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve(this.userLocation); 
        }, (err)=> {
          alert('No se pudo tener geolocalizacion');
          console.log(err);
          reject();
        } );
    } );
  }

  getPlacesByQuery(query: string) {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
    .subscribe( resp => {
      this.places = resp.features;
      this.mapService.createMarkersFromPlaces(resp.features);
      this.isLoadingPlaces = false;
    }, err => {} );
  }
}
