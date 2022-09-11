import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from './../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
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
  
  constructor(private placesApi: PlacesApiClient) { 
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
    //to do: evaluar si query = empty string
    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
    .subscribe( resp => {
      console.log(resp);
      this.places = resp.features;
      this.isLoadingPlaces = false;
    }, err => {} );
  }
}
