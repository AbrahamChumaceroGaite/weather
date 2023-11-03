import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Person } from 'src/app/models/person';
import { Location } from 'src/app/models/demography';
import { Client } from 'src/app/models/client';
import { Rol } from 'src/app/models/rol';

@Injectable()
export class ShareDataService {

  apiPerson: string = environment.apiUrl + "/person";
  apiLocation: string = environment.apiUrl + "/location";
  apiClient: string = environment.apiUrl + "/client";
  apiRol: string = environment.apiUrl + "/rol";

  constructor(private httpClient: HttpClient) {
  }

  private selectedValueSubject = new BehaviorSubject<any>(null);
  selectedValue$ = this.selectedValueSubject.asObservable();

  setSelectedValue(value: any) {
    this.selectedValueSubject.next(value);
  }

  getPersonList(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.apiPerson + '/get');
  }
  
  getLocationList(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.apiLocation + '/get');
  }

  getClientList(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.apiClient + '/get');
  }

  getRolList(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.apiRol + '/get');
  }

}
