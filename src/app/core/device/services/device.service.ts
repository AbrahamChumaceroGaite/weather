import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Device, DeviceID } from 'src/app/models/device';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  api: string = environment.apiUrl + '/device'

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.api + '/get');
  }
  
  getList(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.api + '/get/list');
  }

  getListById(id: number,startDate?: Date, endDate?: Date): Observable<Device[]> {
    let url = `${this.api}/get/list/ById/${id}`;
    if (startDate && endDate) {
      const startDateString = startDate.toISOString();
      const endDateString = endDate.toISOString();
      url += `?startDate=${startDateString}&endDate=${endDateString}`;
    }

    console.log("envio: ", url)
    return this.httpClient.get<Device[]>(url);
  }

  getIdentity() : Observable<DeviceID[]>{
    return this.httpClient.get<DeviceID[]>(this.api + '/get/identity');
  }

  getIdentityList() : Observable<DeviceID[]>{
    return this.httpClient.get<DeviceID[]>(this.api + '/get/identity/list');
  }

  getIdentityById(id: number) : Observable<DeviceID[]>{
    return this.httpClient.get<DeviceID[]>(this.api + '/get/identity/ById/' + id).pipe(
      map((response:any) => response.message) 
    );
  }
 
  postIdentity(body: FormData){
    return this.httpClient.post(this.api + '/post/identity', body).pipe(
      map((response:any) => response.message) 
    );
  }
  
  putIdentity(id: number, body: any){
    return this.httpClient.put(this.api + '/update/identity/' + id, body).pipe(
      map((response:any) => response.message) 
    );
  }

  deleteIdentity(id: number){
    return this.httpClient.delete(this.api + '/delete/identity/' + id).pipe(
      map((response:any) => response.message) 
    );
  }
}
