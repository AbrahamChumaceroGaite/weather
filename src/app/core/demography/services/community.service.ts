import { Observable } from 'rxjs';
import { Community } from 'src/app/models/demography';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  api: string = environment.apiUrl + "/community";

  constructor(
    private httpClient: HttpClient,
    private AuthService: AuthService) {
  }
  getList(): Observable<Community[]> {
    return this.httpClient.get<Community[]>(this.api + '/get');
  }

  get(event: LazyLoadEvent): Observable<{ items: Community[]; totalRecords: number }> {
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
  
    return this.httpClient.get<{ items: Community[]; totalRecords: number }>(this.api + '/getLazy', {
      params
    });
  }

  getById(id: number): Observable<Community[]> {
    return this.httpClient.get<Community[]>(this.api + '/getById/' + id);
  }

  post(body: FormData) {
    return this.httpClient.post(this.api + '/post', body);
  }

  put(id: number, body: any) {
    return this.httpClient.put(this.api + '/update/' + id, body);
  }

  delete(id: number) {
    return this.httpClient.delete(this.api + '/delete/' + id);
  }
}
