import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Device, DeviceID } from 'src/app/models/device';
import { Observable, map } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  api: string = environment.apiUrl + '/device'

  constructor(private httpClient: HttpClient) { }

  getDataLast(id: number): Observable<Device[]> {
    const params: any = {
      idevice: id
    };
    return this.httpClient.get<Device[]>(this.api + '/get/list/last', { params });
  }

  getData(id: number, startDate: string | null, endDate: string | null): Observable<Device[]> {
    const params: any = {
      idevice: id,
      startDate: startDate || '', // Utiliza un valor predeterminado si startDate es nulo
      endDate: endDate || '' // Utiliza un valor predeterminado si endDate es nulo
    };
    return this.httpClient.get<Device[]>(this.api + '/get/list/data', { params });
  }
  

  // DEVICE IDENTITY

  getIdentityList(): Observable<DeviceID[]> {
    return this.httpClient.get<DeviceID[]>(this.api + '/get/identity');
  }

  getIdentity(event: LazyLoadEvent): Observable<{ items: DeviceID[]; totalRecords: number }> {
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

    return this.httpClient.get<{ items: DeviceID[]; totalRecords: number }>(this.api + '/get/identity/Lazy', {
      params
    });
  }

  getIdentityUnused(): Observable<DeviceID[]> {
    return this.httpClient.get<DeviceID[]>(this.api + '/get/identity/list');
  }

  getIdentityById(id: number): Observable<DeviceID[]> {
    return this.httpClient.get<DeviceID[]>(this.api + '/get/identity/ById/' + id)
  }

  postIdentity(body: FormData) {
    return this.httpClient.post(this.api + '/post/identity', body).pipe(
      map((response: any) => response.message)
    );
  }

  putIdentity(id: number, body: any) {
    return this.httpClient.put(this.api + '/update/identity/' + id, body).pipe(
      map((response: any) => response.message)
    );
  }

  deleteIdentity(id: number) {
    return this.httpClient.delete(this.api + '/delete/identity/' + id).pipe(
      map((response: any) => response.message)
    );
  }
}
