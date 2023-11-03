import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEditPersonComponent } from './components/create-edit-person/create-edit-person.component';
import { ViewPersonComponent } from './components/view-person/view-person.component';

import { PersonRoutingModule } from './person-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';


@NgModule({
  declarations: [
    CreateEditPersonComponent,
    ViewPersonComponent
  ],
  imports: [
    CommonModule,   
    FormsModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    ReactiveFormsModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
