import { MessagesService } from 'src/app/services/dialog/message.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { NbDialogRef } from '@nebular/theme';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { setCarouselData, getBackgroundImage, getTemperatureIcon, calculateLastWeekStartDate } from '../functions/graph-data';
import { responsiveOptions,setSelectWeather } from '../../utils/helps';
import { ApexService } from 'src/app/services/miscellaneous/apex.service';

import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";
import { LatLng } from 'leaflet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-device-read',
  templateUrl: './view-device-read.component.html',
  styleUrls: ['./view-device-read.component.scss']
})
export class ViewDeviceReadComponent {
  @ViewChild('dt') dt!: Table;
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @ViewChild('historics') historics!: ElementRef;
  @Input() id!: number;
  public DeviceHistoricData: any;
  charTitle!: string;
  charData: number[] = [];
  charDate: string[] = [];
  startDate!: string | null; 
  endDate: string = '';

  dataLast!: Device[];
  dataCarousel: any;
  dataTemp: any;
  dataDevice!: Device[];
  dataDeviceGraph: { label: string; value: string }[] = setSelectWeather;
  dataFiltered!: Device[]

  selectedItem: any;
  
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  loading = false;
  visible = true;

  responsiveOptions = responsiveOptions;
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

  constructor(
    private datePipe: DatePipe,
    private DeviceService: DeviceService,  
    private MessageService: MessagesService,
    private ApexService: ApexService,
    private dialogRef: NbDialogRef<ViewDeviceReadComponent>
    ) { }

  ngOnInit(): void {
    this.getDataLast();
    this.loadDefaultData();   
    this.getCharts();
    setTimeout((a: any) => {
      this.setMapData();
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  getDataLast() {
    
    this.loading = true;
    this.DeviceService.getDataLast(this.id).subscribe((data: Device[]) => {
      this.dataLast = data;
      const LastDate = data.map((d: Device) => d.newCreatedAt)
      this.dataTemp = data.map((d: Device) => d.temp) 
      this.formHeader = 'dashboard-header';
      this.formlogo = this.getIcon(this.dataTemp);
      this.formTitle = 'Ultimo Reporte de datos - ' + LastDate;
      this.setCarouselData(this.dataLast); 
      this.loading = false;
    }, (err) => {
      this.loading = false;
      this.dialogRef.close();
      this.MessageService.showMsjError(err.error.message);
    });

  }

  getData(startDate: Date, endDate: Date) {
    this.loading = true;    
    const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd HH:mm:ss');
  
    if (formattedStartDate && formattedEndDate) {
      this.DeviceService.getData(this.id, formattedStartDate, formattedEndDate).subscribe((data: Device[]) => {
        this.dataDevice = data;    
        this.filterData('temp');
        this.selectedItem = "temp";       
        this.loading = false;
      });
    } else {
      this.loading = false;
      console.error('Las fechas no son válidas.');
    }
  }

  getIcon(temp: number): string {
    return getTemperatureIcon(temp);
  }

  getBackground(temp: number): string {
    return getBackgroundImage(temp);
  }

  filterData(event: any) {
    this.loading = true;
    const selectedValue = event;
    this.charTitle = selectedValue;

    switch (selectedValue) {
      case 'temp':
        this.charData = this.dataDevice.map((d) => d.temp);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      case 'hum':
        this.charData = this.dataDevice.map((d) => d.hum);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      case 'pres':
        this.charData = this.dataDevice.map((d) => d.pres);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      case 'uv':
        this.charData = this.dataDevice.map((d) => d.uv);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      case 'altitude':
        this.charData = this.dataDevice.map((d) => d.altitude);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      case 'rain':
        this.charData = this.dataDevice.map((d) => d.rain);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      case 'windf':
        this.charData = this.dataDevice.map((d) => d.windf);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      case 'windf':
        this.charData = this.dataDevice.map((d) => d.windf);
        this.charDate = this.dataDevice.map((d) => d.newCreatedAt);
        break;
      default:
        this.charData = [];
        this.charDate = [];
        break;
    }
    this.loading = false;
    this.getCharts();
  }

  getCharts() {
      this.DeviceHistoricData = this.ApexService.generateHystoricLineChart(
      this.charTitle,
      this.charData,
      this.charDate
    );
  }
  

  loadDefaultData() {
    const startDate = calculateLastWeekStartDate();
    const endDate = new Date(); 
    this.getData(startDate, endDate);
  }

  setCarouselData(data: any) { 
    this.dataCarousel = setCarouselData(data);
  }

  setMapData() {
    const markerIcon = Leaflet.icon({
      iconUrl: '/assets/icons/marker.png',
      iconSize: [38, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });
    const filteredData = this.dataLast;
    for (let i = 0; i < filteredData.length; i++) {
      const data = filteredData[i];
      const marker = Leaflet.marker([data.lat, data.lon], { draggable: true, icon: markerIcon })

      marker.addTo(this.map).bindPopup(`<pre>${JSON.stringify(data.name, null, 2)}</pre>`);
      this.markers.push(marker);
    }
  }

  onMapReady(map: Leaflet.Map) {
    this.map = map;
  }

  onDateRangeChange() {
    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      this.getData(startDate, endDate);
    }
  }


}
