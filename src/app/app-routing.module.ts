import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: '', loadChildren: () => import('./core/demography/demography.module').then(m => m.DemographyModule) },
  { path: '', loadChildren: () => import('./core/device/device.module').then(m => m.DeviceModule) },
  { path: '', loadChildren: () => import('./core/login/login.module').then(m => m.LoginModule) },
  { path: '', loadChildren: () => import('./core/report/report.module').then(m => m.ReportModule) },
  { path: '', loadChildren: () => import('./core/user/user.module').then(m => m.UserModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
