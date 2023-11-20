import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  apiUrl: string = environment.apiUrl + '/structure';
  constructor(private httpClient: HttpClient) {}

  //Modulos
  getModule(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.apiUrl + '/master/structure/module/get'
    );
  }

  getModuleById(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.apiUrl + '/master/structure/module/getById/' + id
    );
  }

  postModule(body: any) {
    return this.httpClient
      .post(this.apiUrl + '/master/structure/module/post', body)
      .pipe(map((response: any) => response.mensaje));
  }

  putModule(id: number, body: any) {
    return this.httpClient
      .put(this.apiUrl + '/master/structure/module/put/' + id, body)
      .pipe(map((response: any) => response.mensaje));
  }

  deleteModule(id: number) {
    return this.httpClient.delete(
      this.apiUrl + '/master/structure/module/delete/' + id
    );
  }

  //Componentes
  getComponent(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.apiUrl + '/master/structure/component/get/' + id );
  }

  getComponentList(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.apiUrl + '/master/structure/component/list/get/' + id
    );
  }

  getComponentById(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.apiUrl + '/master/structure/component/getById/' + id
    );
  }

  postComponent(body: any) {
    return this.httpClient
      .post(this.apiUrl + '/master/structure/component/post', body)
      .pipe(map((response: any) => response.mensaje));
  }

  putComponent(id: number, body: any) {
    return this.httpClient
      .put(this.apiUrl + '/master/structure/component/put/' + id, body)
      .pipe(map((response: any) => response.mensaje));
  }

  deleteComponent(id: number) {
    return this.httpClient.delete(
      this.apiUrl + '/master/structure/component/delete/' + id
    );
  }
}
