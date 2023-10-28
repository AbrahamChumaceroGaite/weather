import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../../core/login/components/login/login.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { owl_landing_page } from 'src/app/utils/owl-config';
import { header_info, boxes, services, maps, images, coordinates } from 'src/app/utils/home-data';
import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  images = images;
  header_info = header_info;
  services = services;
  boxes = boxes;
  maps = maps;
  displayLoginModal: boolean = false;

  customOptions: OwlOptions = owl_landing_page;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 5,
    center: { lat: -17.290603833387916, lng: -64.56279996977497 }
  };
  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
    setTimeout((a: any) => {
      this.initMarkers();
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  showLoginModal(): void {
    this.ref = this.dialogService.open(LoginComponent, {
      header: 'Iniciar sesión',
      width: '55%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe();

    this.ref.onMaximize.subscribe();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  initMarkers() {

    const markerIcon = Leaflet.icon({
      iconUrl: './../assets/icons/marker.png',
      iconSize: [38, 41],
      iconAnchor: [15, 60],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });
    const filteredData = coordinates;
    for (let i = 0; i < filteredData.length; i++) {
      const data = filteredData[i];
      const marker = Leaflet.marker([data.lat, data.lon], { draggable: true, icon: markerIcon })
      marker.addTo(this.map).bindPopup(``);
      this.markers.push(marker);
    }
  }

  onMapReady(map: Leaflet.Map) {
    this.map = map;
  }

}
