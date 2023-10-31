import { Observable, map } from 'rxjs';
import { ClientDevice } from 'src/app/models/clientdevice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDeviceService {
  api: string = environment.apiUrl + "/device/client";

  constructor(private httpClient: HttpClient) {
   }

   get() : Observable<ClientDevice[]>{
    return this.httpClient.get<ClientDevice[]>(this.api + '/get');
  }

  getById(id: number): Observable<ClientDevice[]>{
    return this.httpClient.get<ClientDevice[]>(this.api + '/getById/' + id).pipe(
      map((response:any) => response.message) 
    );
  }

  post(body: FormData){
    return this.httpClient.post(this.api + '/post', body).pipe(
      map((response:any) => response.message) 
    );
  }

  put(id: number, body: any){
    return this.httpClient.put(this.api + '/update/' + id, body).pipe(
      map((response:any) => response.message) 
    );
  }

  delete(id: number){
    return this.httpClient.delete(this.api + '/delete/' + id).pipe(
      map((response:any) => response.message) 
    );
  }
}
