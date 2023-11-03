import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ViewUserComponent } from './components/users/view-user/view-user.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';
import { ViewClientComponent } from './components/client/view-client/view-client.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: 'view/user', component: ViewUserComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },
      { path: 'view/client', component: ViewClientComponent, canActivate: [AuthGuard], data: { component: '25', action: 'ver' } },
    ],
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '***', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
