import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { ViewClientDeviceComponent } from '../device/components/client-device/view-client-device/view-client-device.component';
import { CreateEditClientDeviceComponent } from '../device/components/client-device/create-edit-client-device/create-edit-client-device.component';
import { CreateEditDeviceComponent } from './devices/create-edit-device/create-edit-device.component';
import { ViewDeviceComponent } from './devices/view-device/view-device.component';
import { ViewDevicesTabsComponent } from './devices/view-devices-tabs/view-devices-tabs.component';
import { ViewDeviceReadComponent } from './devices/view-device-read/view-device-read.component';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateEditDeviceComponent,
    CreateEditClientDeviceComponent,
    ViewClientDeviceComponent,
    ViewDeviceComponent,
    ViewDevicesTabsComponent,
    ViewDeviceReadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule { }
