import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemographyRoutingModule } from './demography-routing.module';

import { CreateEditProvinceComponent } from './components/province/create-edit-province/create-edit-province.component';
import { ViewProvinceComponent } from './components/province/view-province/view-province.component';
import { CreateEditMunicipalityComponent } from './components/municipality/create-edit-municipality/create-edit-municipality.component';
import { ViewMunicipalityComponent } from './components/municipality/view-municipality/view-municipality.component';
import { CreateEditCommunityComponent } from './components/community/create-edit-community/create-edit-community.component';
import { ViewCommunityComponent } from './components/community/view-community/view-community.component';
import { CreateEditLocationComponent } from './components/location/create-edit-location/create-edit-location.component';
import { ViewLocationComponent } from './components/location/view-location/view-location.component';
import { NebularLibraryModule } from 'src/app/modules/nebular-library.module';
import { PrimengLibraryModule } from 'src/app/modules/primeng-library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateEditProvinceComponent,
    ViewProvinceComponent,
    CreateEditMunicipalityComponent,
    ViewMunicipalityComponent,
    CreateEditCommunityComponent,
    ViewCommunityComponent,
    CreateEditLocationComponent,
    ViewLocationComponent
  ],
  imports: [
    CommonModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    FormsModule,
    ReactiveFormsModule,
    DemographyRoutingModule
  ]
})
export class DemographyModule { }
