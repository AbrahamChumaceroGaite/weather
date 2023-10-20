import { Observable } from 'rxjs';
import { Municipality } from 'src/app/models/demography';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {
  api: string = environment.apiUrl + "/municipality";

  constructor(private httpClient: HttpClient) {
   }

   get() : Observable<Municipality[]>{
    return this.httpClient.get<Municipality[]>(this.api + '/get');
  }

  getById(id: number): Observable<Municipality[]>{
    return this.httpClient.get<Municipality[]>(this.api + '/getById/' + id);
  }

  post(body: FormData){
    return this.httpClient.post(this.api + '/post', body);
  }

  put(id: number, body: any){
    return this.httpClient.put(this.api + '/update/' + id, body);
  }

  delete(id: number){
    return this.httpClient.delete(this.api + '/delete/' + id);
  }
}
