import { Observable, map } from 'rxjs';
import { Client } from 'src/app/models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  api: string = environment.apiUrl + "/client";

  constructor(private httpClient: HttpClient) {
   }

   get() : Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.api + '/get');
  }

  getById(id: number): Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.api + '/getById/' + id).pipe(
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
