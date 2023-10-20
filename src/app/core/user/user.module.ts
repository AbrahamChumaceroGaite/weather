import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';


import { CreateEditUserComponent } from './components/users/create-edit-user/create-edit-user.component';
import { ViewUserComponent } from './components/users/view-user/view-user.component';
import { ViewClientComponent } from './components/client/view-client/view-client.component';
import { CreateEditClientComponent } from './components/client/create-edit-client/create-edit-client.component';

import { ViewUserTabsComponent } from './components/view-user-tabs/view-user-tabs.component';
import { ViewClientDeviceComponent } from './components/client-device/view-client-device/view-client-device.component';
import { CreateEditClientDeviceComponent } from './components/client-device/create-edit-client-device/create-edit-client-device.component';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateEditUserComponent,
    CreateEditClientComponent,
    CreateEditClientDeviceComponent,
    ViewUserComponent,
    ViewClientComponent,
    ViewUserTabsComponent,
    ViewClientDeviceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    UserRoutingModule
  ]
})
export class UserModule { }
