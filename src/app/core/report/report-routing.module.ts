import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ViewAdminHomeComponent } from './components/view-admin-home/view-admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'home/admin/device', component: ViewAdminHomeComponent,
        canActivate: [AuthGuard], data: { component: '25', action: 'ver' }
      },
      {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard], data: { component: '25', action: 'ver' }
      },
    ],
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '***', redirectTo: '/404', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
