import { Observable } from 'rxjs';
import { Province } from 'src/app/models/demography';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  api: string = environment.apiUrl + "/province";

  constructor(private httpClient: HttpClient) {
   }

   get() : Observable<Province[]>{
    return this.httpClient.get<Province[]>(this.api + '/get');
  }

  getById(id: number): Observable<Province[]>{
    return this.httpClient.get<Province[]>(this.api + '/getById/' + id);
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
