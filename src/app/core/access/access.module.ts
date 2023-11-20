import { CreateEditUserControlComponent } from './components/control/create-edit-user-control/create-edit-user-control.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { ViewUserControlComponent } from './components/control/view-user-control/view-user-control.component';
import { ViewRolComponent } from './components/rol/view-rol/view-rol.component';
import { CreateEditRolComponent } from './components/rol/create-edit-rol/create-edit-rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';


@NgModule({
  declarations: [
    CreateEditUserControlComponent,
    ViewUserControlComponent,
    CreateEditRolComponent,
    ViewRolComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    ReactiveFormsModule,
    AccessRoutingModule
  ]
})
export class AccessModule { }
