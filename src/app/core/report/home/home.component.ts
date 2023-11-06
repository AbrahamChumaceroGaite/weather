import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { SocketMasterService } from 'src/app/services/miscellaneous/socket.service';

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
    private socketService: SocketMasterService){

 
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
