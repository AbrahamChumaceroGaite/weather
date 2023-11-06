import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiUrl: string = environment.apiUrl + "/notification";
  constructor(private httpClient: HttpClient) {

  }

  getReport(event: LazyLoadEvent) {
    const params: any = {
      id: sessionStorage.getItem('iduser'),
      first: event.first, // Índice del primer elemento a cargar
      rows: event.rows, // Cantidad de elementos a cargar por página
    };
    return this.httpClient.get(this.apiUrl + '/get/report', {params});
  }

  getNotifications(event: LazyLoadEvent) {
    const params: any = {
      id: sessionStorage.getItem('idUser'),
      first: event.first, // Índice del primer elemento a cargar
      rows: event.rows, // Cantidad de elementos a cargar por página
    };
    return this.httpClient.get(this.apiUrl + '/get/notifitacions', {params});
  }

  readNotification(id: number) {
    const body = ''
    return this.httpClient.put(this.apiUrl + '/update/notificactions/' + id,body).pipe(
      map((response: any) => response.mensaje)
    );
  }

  getDashboard() {
    const params : any = {
      id: sessionStorage.getItem('idUser'),
    }
    return this.httpClient.get(this.apiUrl + '/main/admin/dashboard', {params});
  }

  postUser(data: any) {
    const body: any = {
      body: data,
      id: sessionStorage.getItem('iduser'),
    }
    return this.httpClient.post(this.apiUrl + '/register/subscription/user', body).pipe(
      map((response: any) => response.mensaje)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.apiUrl + '/delete/' + id);
  }

}
