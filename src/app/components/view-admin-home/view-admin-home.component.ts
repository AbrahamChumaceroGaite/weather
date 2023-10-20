import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { DeviceID } from 'src/app/models/device';
import { ChartService } from 'src/app/core/report/services/charts-service.service';
import { ApexService } from 'src/app/services/graphics/apex.service';

import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-view-admin-home-home',
  templateUrl: './view-admin-home.component.html',
  styleUrls: ['./view-admin-home.component.scss'],
})

export class ViewAdminHomeHomeComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @ViewChild('historics') historics!: ElementRef;
  public DeviceHistoricData: any;
  charTitle!: string;
  charData: number[] = [];
  charDate: string[] = [];
  deviceIdData: DeviceID[] = [];
  deviceData: Device[] = [];
  deviceDataGraph: { label: string; value: string }[] = [
    { label: 'Temperatura', value: 'temp' },
    { label: 'Humedad', value: 'hum' },
    { label: 'Presión', value: 'pres' },
    { label: 'UV', value: 'uv' },
    { label: 'Altitud', value: 'altitude' },
    { label: 'Lluvia', value: 'rain' },
    { label: 'Velocidad del viento (fuerza)', value: 'windf' },
    { label: 'Velocidad del viento (dirección)', value: 'windf' },
  ];
  deviceLastData: any;
  deviceCarouselData: any;
  date: any;
  temp: any;
  selectedDevice: number | null = null;
  loading: boolean = true;
  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: -21.53324450860366, lng: -64.73158650262741 }
  };
  selectedMarkerData: any;
  startDate: Date | undefined = undefined;
  endDate: Date | undefined = undefined;

  isVertical!: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isVertical = window.innerWidth < 767;
  }


  constructor(
    private deviceService: DeviceService,
    private ApexService: ApexService
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.getCharts();
    setTimeout((a: any) => {
      this.initMarkers();
      window.dispatchEvent(new Event('resize'));
    }, 1000);

  }

  getData() {
    this.loading = true;
    this.deviceService.getIdentity().subscribe((data) => {
      this.deviceIdData = data;
      if (this.deviceIdData.length > 0) {
        this.selectedDevice = this.deviceIdData[0].id;
        this.filterDevice(this.deviceIdData[0]);
      }
    });
    this.loading = false;
  }

  applyFilter() {
    this.filterDevice(this.selectedDevice);
  }

  filterDevice(event: any) {
    this.selectedDevice
    const startDateValue = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDateValue = (document.getElementById('endDate') as HTMLInputElement).value;
    this.startDate = startDateValue ? new Date(startDateValue) : undefined;
    this.endDate = endDateValue ? new Date(endDateValue) : undefined; // Cambiar undefined por null

    if (this.selectedDevice !== null) {
      this.deviceService.getListById(this.selectedDevice, this.startDate, this.endDate).subscribe((data: Device[]) => {
        this.deviceData = data;
        
        this.deviceLastData = [];
        if (this.deviceData.length > 0) {
          this.deviceLastData.push(this.deviceData[this.deviceData.length - 1]);
          this.deviceCarouselData = [
            { title: 'Temperatura', values: this.deviceLastData[0].temp + `º`, img: 'assets/thumbails/temperature.png' },
            { title: 'Humedad', values: this.deviceLastData[0].hum + `%`, img: 'assets/thumbails/humidity.png' },
            { title: 'Presión', values: this.deviceLastData[0].pres, img: 'assets/thumbails/pressure.png' },
            { title: 'UV', values: this.deviceLastData[0].uv, img: 'assets/thumbails/uv.png' },
            { title: 'Altitud', values: this.deviceLastData[0].altitude, img: 'assets/thumbails/altitude.png' },
            { title: 'Lluvia', values: this.deviceLastData[0].rain, img: 'assets/thumbails/rain.png' },
            { title: 'Viento (fuerza)', values: this.deviceLastData[0].windf, img: 'assets/thumbails/windf.png' },
            { title: 'Viento (dirección)', values: this.deviceLastData[0].winds, img: 'assets/thumbails/winds.png' },

          ];
          this.date = this.deviceLastData[0].createdAt;
          this.temp = this.deviceLastData[0].temp;
          this.getTemperatureIcon(this.temp);
          this.getBackgroundImage(this.temp)
          const deviceCoordinates = this.deviceLastData[0];
          const center = new LatLng(deviceCoordinates.lat, deviceCoordinates.lon);
          this.map.panTo(center); // Mueve el centro del mapa a las coordenadas del dispositivo

          // Elimina los marcadores anteriores
          this.markers.forEach(marker => this.map.removeLayer(marker));
          this.markers = [];

          // Agrega un nuevo marcador en las coordenadas del dispositivo
          const markerIcon = Leaflet.icon({
            iconUrl: './assets/img/marker.svg',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
            shadowAnchor: [12, 41]
          });

          const marker = Leaflet.marker([deviceCoordinates.lat, deviceCoordinates.lon], { draggable: true, icon: markerIcon })
            .on('click', (event) => this.markerClicked(event, 0)) // Usamos el índice 0 para hacer referencia al único marcador en el array
            .on('dragend', (event) => this.markerDragEnd(event, 0)); // Usamos el índice 0 para hacer referencia al único marcador en el array

          marker.addTo(this.map).bindPopup(`<b>${deviceCoordinates.lat},  ${deviceCoordinates.lon}</b>`);
          this.markers.push(marker);
        }
       
      });
    }
  }

  filterData(event: any) {
    this.filterDevice(this.selectedDevice)
    const selectedValue = event.value;
    this.charTitle = selectedValue;
   
    switch (selectedValue) {
      case 'temp':
        this.charData = this.deviceData.map((d) => d.temp);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      case 'hum':
        this.charData = this.deviceData.map((d) => d.hum);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      case 'pres':
        this.charData = this.deviceData.map((d) => d.pres);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      case 'uv':
        this.charData = this.deviceData.map((d) => d.uv);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      case 'altitude':
        this.charData = this.deviceData.map((d) => d.altitude);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      case 'rain':
        this.charData = this.deviceData.map((d) => d.rain);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      case 'windf':
        this.charData = this.deviceData.map((d) => d.windf);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      case 'windf':
        this.charData = this.deviceData.map((d) => d.windf);
        this.charDate = this.deviceData.map((d) => d.createdAt);
        break;
      // Agrega casos para los otros valores
      default:
        this.charData = [];
        this.charDate = [];
        break;
    }
    this.getCharts();
  }

  getCharts() {
    this.DeviceHistoricData = this.ApexService.generateHystoricLineChart(
      this.charTitle,
      this.charData,
      this.charDate
    );
  }

  initMarkers() {
    const markerIcon = Leaflet.icon({
      iconUrl: 'assets/img/marker.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });
    const filteredData = this.deviceLastData;
    for (let i = 0; i < filteredData.length; i++) {
      const data = filteredData[i];
      console.log("Mapa: ", data)
      const marker = Leaflet.marker([data.lat, data.lon], { draggable: true, icon: markerIcon })
        .on('click', (event) => this.markerClicked(event, i))
        .on('dragend', (event) => this.markerDragEnd(event, i));
      marker.addTo(this.map).bindPopup(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
      this.markers.push(marker);
    }
  }

  onMapReady(map: Leaflet.Map) {
    this.map = map;
  }

  markerClicked(event: any, index: number) {
    const markerIndex = this.markers.indexOf(event.target);
    const deviceData = this.deviceLastData[markerIndex];
    console.log(deviceData); // Mostrar los datos completos en la consola
    event.target.setPopupContent(`<pre>${JSON.stringify(this.deviceLastData, null, 2)}</pre>`);
  }

  markerDragEnd(event: any, index: number) {
    console.log(event.target.getLatLng());
  }

  getTemperatureIcon(temp: number): string {
    if (temp > 20) {
      return 'thermometer-plus-outline';
    } else if (temp > 15) {
      return 'thermometer-minus-outline';
    } else {
      return 'thermometer-outline';
    }
  }

  getBackgroundImage(temp: number): string {
    if (temp > 20) {
      return 'url(./assets/img/sun.jpeg)';
    } else if (temp > 15) {
      return 'url(./assets/img/normal.png)';
    } else {
      return 'url(./assets/img/cold.jpg)';
    }
  }

  clearFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.filterDevice(this.selectedDevice);
  }
}
