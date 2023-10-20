import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Weather-Monitoring';
  constructor(private swUpdate: SwUpdate, public authService: AuthService) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Hay una nueva versión disponible. ¿Desea cargar la nueva versión?')) {
          window.location.reload();
        }
      });
    }}
}
