import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewUserComponent } from './components/users/view-user/view-user.component';
import { ViewUserTabsComponent } from './components/view-user-tabs/view-user-tabs.component';

import { AuthGuard } from 'src/app/guard/auth-guard.guard';

const routes: Routes = [

  { path: 'view/client/tabs', component: ViewUserTabsComponent, canActivate: [AuthGuard] },
  { path: 'view/user', component: ViewUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
