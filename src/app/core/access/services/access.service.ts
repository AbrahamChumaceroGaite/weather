import { Observable, map } from 'rxjs';
import { Rol } from 'src/app/models/rol';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccesService {
  api: string = environment.apiUrl + "/access";

  constructor(private httpClient: HttpClient) {
  }

  getPermissions(id: number): Observable<any> {
    return this.httpClient.get(this.api + '/admin/permission/access/getByUser/' + id)
  }

  getAccess(id: number) : Observable<any[]>{
    return this.httpClient.get<any[]>(this.api + '/admin/permission/access/get/' + id);
  }

  geTAccessById(id: number) : Observable<any[]>{
    return this.httpClient.get<any[]>(this.api + '/admin/permission/access/getById/' + id);
  }

  getAccessByUser(id: number) : Observable<any[]>{
    return this.httpClient.get<any[]>(this.api + '/admin/permission/access/getByUser/' + id);
  }

  postAccess(body: any){
    return this.httpClient.post(this.api + '/admin/permission/access/post', body).pipe(
      map((response:any) => response.message) 
    );
  }

  putAccess(id: number, body: any){
    return this.httpClient.put(this.api + '/admin/permission/access/put/' + id, body).pipe(
      map((response:any) => response.message) 
    );
  }

  deleteAccess(id: number){
    return this.httpClient.delete(this.api + '/admin/permission/access/delete/' + id);
  }  
}
