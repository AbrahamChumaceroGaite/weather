import { NavComponent } from './../../components/nav/nav.component';
import { AuthGuard } from './../../guard/auth-guard.guard';
import { NgModule } from '@angular/core';
import { ViewComponentComponent } from './components/view-component/view-component.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: NavComponent,
        children: [            
            { path: 'panel/components/list', component: ViewComponentComponent, data: { component: '32', action: 'ver' } },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StructureRoutingModule { }
