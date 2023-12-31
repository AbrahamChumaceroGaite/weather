import { ShareDataService } from 'src/app/services/shared/shared.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { setCarouselData, getBackgroundImage, getTemperatureIcon, getMonthName } from '../functions/graph-data';
import { responsiveOptions, setSelectWeather } from '../../utils/helps';
import { ChartService } from 'src/app/services/miscellaneous/charts-service.service';
import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { owl_landing_page } from 'src/app/utils/owl-config';
import { DatePipe } from '@angular/common';
import { product } from 'src/app/models/product';
import { category } from 'src/app/models/category';

@Component({
  selector: 'app-view-device-read',
  templateUrl: './view-device-read.component.html',
  styleUrls: ['./view-device-read.component.scss']
})
export class ViewDeviceReadComponent {
  @ViewChild('dt') dt!: Table;
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @ViewChild('meditor') meditor!: ElementRef;
  @ViewChild('historic') historic!: ElementRef;
  @ViewChild('temperature') temperature!: ElementRef;
  @ViewChild('average') average!: ElementRef;
  @ViewChild('average2') average2!: ElementRef;
  @Input() id!: number;
  
  charTitle!: string;
  charData: number[] = [];
  charDate: string[] = [];
  startDate!: string | null;
  endDate: string = '';

  dataLast!: Device[];
  dataCarousel: any;
  dataTemp: any;
  dataDate: any
  dateLocation: any;
  dataDevice!: Device[];
  dataHours!: any[];
  dataDeviceGraph: { label: string; value: string }[] = setSelectWeather;


  selectedItem: any;
  selectedCategory: any;
  selectedYear: any;
  productData!: product[];
  categories: category[] = [];
  filteredData: any[] = [];
  filterValue: string = '';
  totalRecords = 0;

  loading = false;
  visible = true;

  responsiveOptions = responsiveOptions;
  customOptions: OwlOptions = owl_landing_page;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 15,
    center: { lat: -21.52624450860366, lng: -64.73158650262741 }
  };

  constructor(
    private datePipe: DatePipe,
    private DeviceService: DeviceService,
    private MessageService: MessagesService,
    private ChartService: ChartService,
    private ShareDataService: ShareDataService,
  ) {
    this.ShareDataService.selectedDevice$.subscribe((value) => {
      this.id = value;
    })
   }

  ngOnInit(): void {
    this.getDataLast();
    setTimeout((a: any) => {  
      this.setMapData();
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  ngAfterViewInit() {
    this.getDataLast();
    this.getData();
  }

  getDataLast() {
    this.loading = true;
    this.DeviceService.getDataLast(this.id).subscribe((data: Device[]) => {
      this.dataLast = data;
      this.dataDate = data.map((d: Device) => d.createdAt)
      this.dataTemp = data.map((d: Device) => d.temp)
      this.dateLocation = data.map((d: Device) => d.location)
      this.dataCarousel = setCarouselData(this.dataLast);    
      this.getData();
      this.loading = false;
      this.ChartService.meditor(this.meditor.nativeElement, this.dataTemp);
    }, (err) => {
      this.loading = false;
      this.MessageService.showMsjError(err.error.message);
    });
  }

  getData() {
    this.loading = true;
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd HH:mm:ss');
    this.DeviceService.getData(this.id, formattedStartDate, formattedEndDate).subscribe((data: any) => {
      this.dataDevice = data.device;
      this.dataHours = data.hour;
      this.selectedYear = data.hour[0];    
      this.filterData('hum');
      this.selectedItem = "hum";
      const values = this.dataDevice.map((d) => d.temp);
      const names = this.dataDevice.map((d) => d.createdAt);
      this.ChartService.LineChartTemperature(this.temperature.nativeElement, names, values);
      if (values.length > 0) {
        const sum = values.reduce((acc, currentValue) => acc + currentValue, 0);
        const average = sum / values.length;      
        const averageFormatted = parseFloat(average.toFixed(2));      
        this.ChartService.AverageChart(this.average.nativeElement, averageFormatted);
      } else {
        this.ChartService.AverageChart(this.average.nativeElement, 0);
      }      
      this.loading = false;
    }, (err) => {
      this.loading = false;
    });
  }

  getMonthNames() {
    return getMonthName();
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
    this.charTitle = this.dataDeviceGraph.find((d) => d.value === selectedValue)?.label.toLocaleUpperCase() || '';

    switch (selectedValue) {
      case 'hum':
        this.charData = this.dataDevice.map((d) => d.hum);
        this.charDate = this.dataDevice.map((d) => d.createdAt);
        break;
      case 'pres':
        this.charData = this.dataDevice.map((d) => d.pres);
        this.charDate = this.dataDevice.map((d) => d.createdAt);
        break;
      case 'uv':
        this.charData = this.dataDevice.map((d) => d.uv);
        this.charDate = this.dataDevice.map((d) => d.createdAt);
        break;
      case 'altitude':
        this.charData = this.dataDevice.map((d) => d.altitude);
        this.charDate = this.dataDevice.map((d) => d.createdAt);
        break;
      case 'rain':
        this.charData = this.dataDevice.map((d) => d.rain);
        this.charDate = this.dataDevice.map((d) => d.createdAt);
        break;
      case 'windf':
        this.charData = this.dataDevice.map((d) => d.windf);
        this.charDate = this.dataDevice.map((d) => d.createdAt);
        break;
      case 'windf':
        this.charData = this.dataDevice.map((d) => d.windf);
        this.charDate = this.dataDevice.map((d) => d.createdAt);
        break;
      default:
        this.charData = [];
        this.charDate = [];
        break;
    }
    this.loading = false;
    this.getEcharts();
  }
 
  getEcharts() {
    const names = this.charDate;
    const values = this.charData;
    this.ChartService.LineChartWithBrush(this.historic.nativeElement, names, values);

    if (values.length > 0) {
      const sum = values.reduce((acc, currentValue) => acc + currentValue, 0);
      const average = sum / values.length;      
      const averageFormatted = parseFloat(average.toFixed(2));      
      this.ChartService.AverageChart2(this.average2.nativeElement, averageFormatted);
    } else {
      this.ChartService.AverageChart2(this.average2.nativeElement, 0);
    }
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
      this.getData();
    }
  }


}
