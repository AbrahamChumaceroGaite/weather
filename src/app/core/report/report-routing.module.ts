import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewAdminHomeComponent } from './components/view-admin-home/view-admin-home.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';

const routes: Routes = [
  { path: 'home/admin/device', component: ViewAdminHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
