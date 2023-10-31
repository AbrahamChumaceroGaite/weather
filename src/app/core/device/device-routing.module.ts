import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ViewDevicesTabsComponent } from './devices/view-devices-tabs/view-devices-tabs.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';

const routes: Routes = [

  {
    path: '',
    component: NavComponent,
    children: [
      { path: 'view/device/tabs', component: ViewDevicesTabsComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },

    ],
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '***', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
