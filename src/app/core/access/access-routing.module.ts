import { NgModule } from '@angular/core';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { ViewUserControlComponent } from './components/control/view-user-control/view-user-control.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';

const routes: Routes = [
  {
      path: '',
      component: NavComponent,        
      children: [             
          { path: 'user/admin/account/access-control', component: ViewUserControlComponent,  
          canActivate: [AuthGuard], data: { component: '25', action: 'ver' }},
          { path: '', redirectTo: 'home', pathMatch: 'full' },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
