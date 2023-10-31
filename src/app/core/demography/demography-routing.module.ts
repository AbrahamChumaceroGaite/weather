import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ViewProvinceComponent } from './components/province/view-province/view-province.component';
import { ViewMunicipalityComponent } from './components/municipality/view-municipality/view-municipality.component';
import { ViewCommunityComponent } from './components/community/view-community/view-community.component';
import { ViewLocationComponent } from './components/location/view-location/view-location.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';
import { AdminDemographyComponent } from './components/admin-demography/admin-demography.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: 'view/demography', component: AdminDemographyComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },
      { path: 'view/province', component: ViewProvinceComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },
      { path: 'view/municipality', component: ViewMunicipalityComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },
      { path: 'view/community', component: ViewCommunityComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },
      { path: 'view/location', component: ViewLocationComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },
    ],
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '***', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemographyRoutingModule { }
