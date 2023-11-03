import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = environment.apiUrl + "/user";

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.api + '/get');
  }

  get(id: number, event: LazyLoadEvent): Observable<{ items: User[]; totalRecords: number }> {
    const params: any = {
      id: id,
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

    return this.httpClient.get<{ items: User[]; totalRecords: number }>(this.api + '/getLazy', {
      params
    });
  }

  getById(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.api + '/getById/' + id)
  }

  post(body: any) {
    return this.httpClient.post(this.api + '/post', body).pipe(
      map((response: any) => response.message)
    );
  }

  put(id: number, body: any) {
    return this.httpClient.put(this.api + '/update/' + id, body).pipe(
      map((response: any) => response.message)
    );
  }

  putRol(id: number, body: any) {
    return this.httpClient.put(this.api + '/update/rol/' + id, body).pipe(
      map((response: any) => response.message)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.api + '/delete/' + id).pipe(
      map((response: any) => response.message)
    );
  }
}
