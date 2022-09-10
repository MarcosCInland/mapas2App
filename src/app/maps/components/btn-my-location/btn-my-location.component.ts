import { Component, OnInit } from '@angular/core';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: [ './btn-my-location.component.css'
  ]
})
export class BtnMyLocationComponent implements OnInit {

  constructor(private mapsService: MapsService, private placesService: PlacesService) { }

  ngOnInit(): void {
  }

  goToMyLocation() {
    if (!this.placesService.isUserLocationReady) {
      throw new Error("No hay ubicacion de usuario");
    }
    if (!this.mapsService.isMapReady) {
      throw new Error("No hay mapa disponible");
    }
    this.mapsService.flyTo(this.placesService.userLocation);
  }

}
