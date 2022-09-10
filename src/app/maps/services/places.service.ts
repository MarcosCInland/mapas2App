import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] = [-90.54694577834591, 14.684779898165859];
  get isUserLocationReady(): boolean {
    return !!this.userLocation; //no hay valor, y lo niega
  }
  
  constructor() { 
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
}
