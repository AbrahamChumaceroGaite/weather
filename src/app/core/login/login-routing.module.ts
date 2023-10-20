import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DeniedComponent } from './components/denied/denied.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'denied', component: DeniedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
