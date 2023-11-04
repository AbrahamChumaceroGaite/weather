import { Observable, map } from 'rxjs';
import { DeviceClient } from 'src/app/models/device';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDeviceService {
  api: string = environment.apiUrl + "/device/client";

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<DeviceClient[]> {
    return this.httpClient.get<DeviceClient[]>(this.api + '/get');
  }

  getById(id: number): Observable<DeviceClient[]> {
    return this.httpClient.get<DeviceClient[]>(this.api + '/getById/' + id)
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
