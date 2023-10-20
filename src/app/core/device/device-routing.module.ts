import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewDevicesTabsComponent } from './devices/view-devices-tabs/view-devices-tabs.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';


const routes: Routes = [
  { path: 'view/device/tabs', component: ViewDevicesTabsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
