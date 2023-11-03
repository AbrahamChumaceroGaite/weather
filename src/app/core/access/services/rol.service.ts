import { Observable, map } from 'rxjs';
import { Rol } from 'src/app/models/rol';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  api: string = environment.apiUrl + "/rol";

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.api + '/get');
  }

  getById(id: number): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.api + '/getById/' + id).pipe(
      map((response: any) => response.message)
    );
  }

  post(body: FormData) {
    return this.httpClient.post(this.api + '/post', body).pipe(
      map((response: any) => response.message)
    );
  }

  put(id: number, body: any) {
    return this.httpClient.put(this.api + '/update/' + id, body).pipe(
      map((response: any) => response.message)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.api + '/delete/' + id).pipe(
      map((response: any) => response.message)
    );
  }
}
