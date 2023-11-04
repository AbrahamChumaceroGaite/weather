import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { CreateEditDeviceComponent } from './components/create-edit-device/create-edit-device.component';
import { ViewDeviceComponent } from './components/view-device/view-device.component';
import { ViewDeviceReadComponent } from './components/view-device-read/view-device-read.component';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditDeviceClientComponent } from './components/create-edit-device-client/create-edit-device-client.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    CreateEditDeviceComponent,
    ViewDeviceComponent,
    ViewDeviceReadComponent,
    CreateEditDeviceClientComponent
  ],
  imports: [
    NgApexchartsModule,
    LeafletModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule { }
