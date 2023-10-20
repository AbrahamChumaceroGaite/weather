import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProvinceComponent } from './components/province/view-province/view-province.component';
import { ViewMunicipalityComponent } from './components/municipality/view-municipality/view-municipality.component';
import { ViewCommunityComponent } from './components/community/view-community/view-community.component';
import { ViewLocationComponent } from './components/location/view-location/view-location.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';

const routes: Routes = [
  { path: 'view/province', component: ViewProvinceComponent, canActivate: [AuthGuard] },
  { path: 'view/municipality', component: ViewMunicipalityComponent, canActivate: [AuthGuard] },
  { path: 'view/community', component: ViewCommunityComponent, canActivate: [AuthGuard] },
  { path: 'view/location', component: ViewLocationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemographyRoutingModule { }
