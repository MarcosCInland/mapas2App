import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike ) {
    if (!this.isMapReady) {
      throw new Error("El mapa no esta inicializado");
    }
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) {
      throw new Error("Mapa no inicializado");
    }

    this.markers.forEach(marker => marker.remove());
    const newMarkers: Marker[] = [];
    places.forEach(place =>{
      const [lng, lat] = place.center;
      const popup = new Popup()
      .setHTML(`
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
      `)
      const newMarker = new Marker()
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.map!);

      //ADD TO ARRAY
      newMarkers.push(newMarker);
    })

    this.markers = newMarkers;
    if (places.length === 0) {
      return;
    }

    //MAP LIMITS
    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend(marker.getLngLat()))
    //ADD LIMIT FOR USER LOCATION
    bounds.extend(userLocation);
    this.map.fitBounds(bounds, {
      padding: 200
    })
  }

  constructor() { }
}
