import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { DeviceID } from 'src/app/models/device';
import { ApexService } from 'src/app/services/miscellaneous/apex.service';

import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-view-admin-home',
  templateUrl: './view-admin-home.component.html',
  styleUrls: ['./view-admin-home.component.scss'],
})

export class ViewAdminHomeComponent implements OnInit {



  constructor(
    private deviceService: DeviceService,
    private ApexService: ApexService
  ) {

  }

  ngOnInit(): void {
  
  }
}