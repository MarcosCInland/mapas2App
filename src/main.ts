import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY29zYzEwIiwiYSI6ImNsN2YwMXR1czA1aDMzcG80NDM1eGhrMnMifQ.hFhEr3PIPvWO5nJQrPFbfA';

if (!navigator.geolocation) {
  alert('Navegador no soporta la geolocation');
  throw new Error('Navegador no soporta la geolocation');
  
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
