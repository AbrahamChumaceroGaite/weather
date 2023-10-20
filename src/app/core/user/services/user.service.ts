import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = environment.apiUrl + "/user";

  constructor(private httpClient: HttpClient) {
   }

   get() : Observable<User[]>{
    return this.httpClient.get<User[]>(this.api + '/get');
  }

  getById(id: number): Observable<User[]>{
    return this.httpClient.get<User[]>(this.api + '/getById/' + id);
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
