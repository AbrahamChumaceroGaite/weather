import { Observable, map } from 'rxjs';
import { Client } from 'src/app/models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  api: string = environment.apiUrl + "/client";

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.api + '/get');
  }

  get(event: LazyLoadEvent): Observable<{ items: Client[]; totalRecords: number }> {
    const params: any = {
      first: event.first, // Índice del primer elemento a cargar
      rows: event.rows, // Cantidad de elementos a cargar por página
    };

    // Agregar los parámetros para la búsqueda global y el ordenamiento
    if (event.globalFilter) {
      params.globalFilter = event.globalFilter;
    }

    if (event.sortField) {
      params.sortField = event.sortField;
    }

    if (event.sortOrder) {
      params.sortOrder = event.sortOrder;
    }

    return this.httpClient.get<{ items: Client[]; totalRecords: number }>(this.api + '/getLazy', {
      params
    });
  }

  getById(id: number): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.api + '/getById/' + id)
  }

  post(body: FormData) {
    return this.httpClient.post(this.api + '/post', body).pipe(
      map((response: any) => response.message)
    );
  }

  put(id: number, body: any) {
    return this.httpClient.put(this.api + '/update/' + id, body).pipe(
      map((response: any) => response.message)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.api + '/delete/' + id).pipe(
      map((response: any) => response.message)
    );
  }
}
