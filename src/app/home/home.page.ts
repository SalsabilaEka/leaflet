import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-7.768938753815898, 110.37778430008716], 12);

    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    const satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Map data &copy; <a href="https://google.com/maps">Google</a>',
    });

    const terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a>',
    });

    const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    });

    osmLayer.addTo(this.map);

    const baseMaps = {
      'OpenStreetMap': osmLayer,
      'Satellite': satelliteLayer,
      'Terrain': terrainLayer,
      'CartoDB Positron': cartoDBLayer,
    };

    L.control.layers(baseMaps).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker.png',
      iconSize: [25, 25],
      iconAnchor: [12, 25],
      popupAnchor: [0, -25],
    });

    const markersData = [
      { coords: [-7.7698422, 110.3745493], popup: 'Universitas Gadjah Mada' },
      { coords: [-7.785927, 110.370805], popup: 'Tugu Yogyakarta' },
      { coords: [-7.752107, 110.377329], popup: 'Monumen Jogja Kembali' },
      { coords: [-7.782073, 110.363931], popup: 'Malioboro' },
    ];

    markersData.forEach(markerInfo => {
      const marker = L.marker(markerInfo.coords as [number, number], { icon: customIcon }).addTo(this.map);
      marker.bindPopup(markerInfo.popup);
    });
  }
}
