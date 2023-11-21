import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { owl_landing_page } from 'src/app/utils/owl-config';
import { header_info, boxes, services, maps, images, coordinates } from 'src/app/templates/home-data';
import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
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

  public promptEvent : any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e:any) {
    e.preventDefault();
    this.promptEvent = e;
  }
  
  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
    setTimeout((a: any) => {
      this.initMarkers();
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }
  public installPWA() {
    this.promptEvent.prompt();
  }
  
  public shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.promptEvent;
  }
  
  public isRunningStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }


  showLoginModal(): void {
    this.ref = this.dialogService.open(LoginComponent, {
      header: 'Iniciar sesión',
      styleClass: 'login-modal',
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

  openClientAccess(): void {
    const clientAccessUrl = 'https://ucb-weather-client.dev.404.codes/';
    window.open(clientAccessUrl, '_blank');
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

