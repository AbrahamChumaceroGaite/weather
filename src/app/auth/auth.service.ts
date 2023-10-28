import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
  name: string;
  rol: string;
  idrol: string;
  iduser: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = environment.apiUrl; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  login(body: any): Observable<any> {
    const url = `${this.baseUrl}/login/`;
  
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(res => {
        console.log(res)
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('iduser', res.iduser);
        sessionStorage.setItem('name', res.name);
        sessionStorage.setItem('rol', res.rol);
      })
    );
  }


  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('iduser');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('rol'); // Agrega esta línea para eliminar el nombre de usuario
  }


  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // Devuelve true si existe un token almacenado, de lo contrario, devuelve false
  }

  getUserName(): string {
    return sessionStorage.getItem('name') || '';
  }
}
