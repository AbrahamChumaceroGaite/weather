import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';


import { CreateEditUserComponent } from './components/users/create-edit-user/create-edit-user.component';
import { ViewUserComponent } from './components/users/view-user/view-user.component';
import { ViewClientComponent } from './components/client/view-client/view-client.component';
import { CreateEditClientComponent } from './components/client/create-edit-client/create-edit-client.component';

import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditUserRolComponent } from './components/users/create-edit-user-rol/create-edit-user-rol.component';



@NgModule({
  declarations: [
    CreateEditUserComponent,
    CreateEditClientComponent,
    ViewUserComponent,
    ViewClientComponent,
    CreateEditUserRolComponent
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
