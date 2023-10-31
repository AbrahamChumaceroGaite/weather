import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAdminHomeComponent } from './components/view-admin-home/view-admin-home.component';
import { HomeComponent } from './components/home/home.component';

import { ReportRoutingModule } from './report-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ViewAdminHomeComponent,
    HomeComponent
  ],
  imports: [
    NgApexchartsModule,
    CommonModule,    
    FormsModule,
    LeafletModule,
    ReactiveFormsModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
