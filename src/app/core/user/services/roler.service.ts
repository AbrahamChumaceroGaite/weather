import { Observable, map } from 'rxjs';
import { Roles } from 'src/app/models/rol';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolerService {
  api: string = environment.apiUrl + "/rol";

  constructor(private httpClient: HttpClient) {
   }

   get() : Observable<Roles[]>{
    return this.httpClient.get<Roles[]>(this.api + '/get');
  }

  getById(id: number): Observable<Roles[]>{
    return this.httpClient.get<Roles[]>(this.api + '/getById/' + id).pipe(
      map((response:any) => response.message) 
    );
  }

}
