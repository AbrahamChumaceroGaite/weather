import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { SocketMasterService } from 'src/app/services/miscellaneous/socket.service';
import { NotificationService } from '../services/notification.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  room: string = 'homeRoom';
  estadoConexion!: string;
  constructor(
    private CookieService: CookieService,
    private socketService: SocketMasterService,
    private swPush: SwPush,
    private NotificationService: NotificationService){
      if (this.swPush.isEnabled) {
        this.swPush.requestSubscription({
          serverPublicKey: environment.VAPID_PUBLIC_KEY, // Debes generar una clave pública y privada para tus notificaciones.
        }).then(sub => {
          this.NotificationService.postUser(sub).subscribe(data=>{
          
          });
          // Enviar la suscripción al servidor backend.
        })
          .catch(error => {
            console.error('Error al solicitar la suscripción a notificaciones push', error);
          });
      }
 
  }

  ngOnInit(): void {
    this.CookieService.set('room', this.room);
    this.socketService.on('connection', (res:any) => {
      this.estadoConexion = res;
    });
    

    this.socketService.on('disconnect', () => {
      console.log('Desconectado del servidor Socket.io');
      this.estadoConexion = 'Desconectado';
    });

    // Escuchar eventos de notificación
    this.socketService.on('notification', (res: any) => {
      console.log('Notificación recibida:', res);
      this.estadoConexion = res;
      // Realiza las acciones necesarias con la notificación recibida
    });
  
  }
}
