import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeniedComponent } from './components/denied/denied.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: LandingComponent },
  { path: '404', component: LandingComponent },
  { path: '', loadChildren: () => import('./core/demography/demography.module').then(m => m.DemographyModule) },
  { path: '', loadChildren: () => import('./core/device/device.module').then(m => m.DeviceModule) },
  { path: '', loadChildren: () => import('./core/report/report.module').then(m => m.ReportModule) },
  { path: '', loadChildren: () => import('./core/user/user.module').then(m => m.UserModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
