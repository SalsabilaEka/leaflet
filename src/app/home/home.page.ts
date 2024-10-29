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
    this.map = L.map('mapId').setView([-7.7679387538159, 110.37778430008716], 14);

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
      { coords: [-7.7698422, 110.3745493],
        popup: '<b>Universitas Gadjah Mada</b><br><img src="assets/image/UGM.jpg" width="500px" alt="UGM" style="display: block; margin: 0 auto;"><p>Bulaksumur, Kecamatan Depok, Kabupaten Sleman, DI. Yogyakarta</p>'
      },
      { coords: [-7.785927, 110.370805],
        popup: '<b>Tugu Yogyakarta</b><br><img src="assets/image/Tugu.jpg" width="500px" alt="Tugu" style="display: block; margin: 0 auto;"><p>Jl. Jend. Sudirman, Gowongan, Kecamatan Jetis, Kota Yogyakarta, DI. Yogyakarta</p>'
      },
      { coords: [-7.752107, 110.377329],
        popup: '<b>Monumen Jogja Kembali</b><br><img src="assets/image/Monjali.jpg" width="500px" alt="Monjali" style="display: block; margin: 0 auto;"><p>Jl. Ring Road Utara, Jongkang, Sariharjo, Kecamatan Ngaglik, Kabupaten Sleman, DI. Yogyakarta</p>'
      }
    ];

    markersData.forEach(markerInfo => {
      const marker = L.marker(markerInfo.coords as [number, number], { icon: customIcon }).addTo(this.map);
      marker.bindPopup(markerInfo.popup);
    });
  }
}
