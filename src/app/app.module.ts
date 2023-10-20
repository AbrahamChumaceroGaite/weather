import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**Componentes */
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

/**Modulo de las librerias Graficas */
import { PrimengLibraryModule } from './modules/primeng-library.module';
import { NebularLibraryModule } from './modules/nebular-library.module';
import { NbContextMenuModule } from '@nebular/theme';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgApexchartsModule } from 'ng-apexcharts';

/**Librerias Graficas */
import { NbThemeModule, NbSidebarModule, NbMenuModule, NbDialogModule, NbFormFieldModule, NbToastrModule, NbLayoutModule, NbRouteTabsetComponent, NbRouteTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RegisterComponent } from './core/login/components/register/register.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ViewAdminHomeHomeComponent } from './components/view-admin-home/view-admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    ViewAdminHomeHomeComponent
  ],
  imports: [
    NgApexchartsModule,
    LeafletModule,
    BrowserModule,
    AppRoutingModule,
    NbContextMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    NbDialogModule.forRoot(),
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbRouteTabsetModule,
    NebularLibraryModule,
    PrimengLibraryModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
