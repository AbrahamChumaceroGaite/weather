import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MenuNavService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any[]>{
   return this.httpClient.get<any[]>('./assets/tools/json/menu-nav.json')
  }
}
