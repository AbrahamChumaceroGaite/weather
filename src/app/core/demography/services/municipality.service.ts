import { Observable, map } from 'rxjs';
import { Municipality } from 'src/app/models/demography';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {
  api: string = environment.apiUrl + "/municipality";

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<Municipality[]> {
    return this.httpClient.get<Municipality[]>(this.api + '/get');
  }

  get(id: number, event: LazyLoadEvent): Observable<{ items: Municipality[]; totalRecords: number }> {
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
  
    return this.httpClient.get<{ items: Municipality[]; totalRecords: number }>(this.api + '/getLazy', {
      params
    });
  }

  getByDept(id:number): Observable<Municipality[]> {
    return this.httpClient.get<Municipality[]>(this.api + '/getByDept/' + id);
  }

  getById(id: number): Observable<Municipality[]> {
    return this.httpClient.get<Municipality[]>(this.api + '/getById/' + id)
  }

  post(body: FormData) {
    return this.httpClient.post(this.api + '/post', body).pipe(
      map((response:any) => response.message) 
    );
  }

  put(id: number, body: any) {
    return this.httpClient.put(this.api + '/update/' + id, body).pipe(
      map((response:any) => response.message) 
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.api + '/delete/' + id).pipe(
      map((response:any) => response.message) 
    );
  }
}
