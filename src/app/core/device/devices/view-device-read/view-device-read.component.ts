import { Component, Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';

@Component({
  selector: 'app-view-device-read',
  templateUrl: './view-device-read.component.html',
  styleUrls: ['./view-device-read.component.scss']
})
export class ViewDeviceReadComponent {
  @ViewChild('dt') dt!: Table;
  deviceData: Device[] = [];
  cols: any[] = [];
  _selectedColumns!: any[];
  loading: boolean = true;
  filterValue: string = '';
  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(private deviceService: DeviceService,) { }

  ngOnInit(): void {
     this.getData(); 
     this.cols = [
      { field: 'temp', header: 'Temperatura' },
      { field: 'hum', header: 'Humedad' },
      { field: 'pres', header: 'Presión' },
      { field: 'uv', header: 'Radiación UV' },
      { field: 'altitude', header: 'Altitud' },
      { field: 'rain', header: 'Lluvia' },
      { field: 'windf', header: 'Viento (Fuerza)' },
      { field: 'winds', header: 'Viento (Direccion)' },
      { field: 'batt_level', header: 'Batería (%)' },
      { field: 'lat', header: 'Latitud' },
      { field: 'lon', header: 'Longitud' },
      { field: 'number', header: 'Número' },
    ]  
  this._selectedColumns = this.cols;
  }

  getData(){
    return this.deviceService.getList().subscribe((data: Device[])=>{
      this.deviceData = data;
      this.loading = false
    });
  } 

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
}

set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
} 


filterByDate() {
  const startDate = (document.getElementById('startDate') as HTMLInputElement)?.value;
  const endDate = (document.getElementById('endDate') as HTMLInputElement)?.value;

  if (startDate && endDate) {
    const filterRange = [startDate, endDate];
    this.dt.filter(filterRange, 'createdAt', 'between');
  }
}

clearDateFilter() {
  (document.getElementById('startDate') as HTMLInputElement).value = '';
  (document.getElementById('endDate') as HTMLInputElement).value = '';
  this.dt.filter('', 'createdAt', 'equals');
}

}
