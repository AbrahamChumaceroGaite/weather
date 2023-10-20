import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = environment.apiUrl; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  login(body: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
  
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(res => {
        const token = res.token;
        const name = res.name;
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
      })
    );
  }

/*   post(body: any) {
    return this.httpClient.post(this.baseUrl + '/login', body);
  } */

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name'); // Agrega esta línea para eliminar el nombre de usuario
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si existe un token almacenado, de lo contrario, devuelve false
  }

  getUserName(): string {
    return localStorage.getItem('name') || '';
  }
}
