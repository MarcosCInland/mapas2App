import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef
  
  constructor(private placesService: PlacesService, private mapsService: MapsService) { }
  
  ngAfterViewInit(): void {
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });
    // projection: 'globe' // display the map as a 3D globe

    const popup = new Popup()
    .setHTML(`
    <h6>Aqui estoy </h6>
    <span> Estoy en este lugars del mundo </span>
    `);

    new Marker({ color: 'red'})
    .setLngLat(this.placesService.userLocation)
    .setPopup( popup )
    .addTo( map )

    this.mapsService.setMap(map);
  };
}
