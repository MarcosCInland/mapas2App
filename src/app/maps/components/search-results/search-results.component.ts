import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId: string =''
  
  constructor(private placesService: PlacesService, private mapService: MapsService) { }

  ngOnInit(): void {
  }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;

    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature){
    if (!this.placesService.userLocation) {
      throw new Error("No hay user location");
    }
    this.placesService.deletePlaces();

    const start = this.placesService.userLocation;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoints(start, end)
  }

}
