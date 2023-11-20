
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//Modules
import { StructureRoutingModule } from './structure-routing.module';
import { CreateEditModuleComponent } from './components/create-edit-module/create-edit-module.component';
import { CreateEditComponentComponent } from './components/create-edit-component/create-edit-component.component';
import { ViewComponentComponent } from './components/view-component/view-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';

@NgModule({
  declarations: [
    CreateEditComponentComponent,
    CreateEditModuleComponent,
    ViewComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    ReactiveFormsModule,
    StructureRoutingModule
  ]
})
export class StructureModule { }
