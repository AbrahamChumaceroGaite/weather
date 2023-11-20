import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AccesService } from '../core/access/services/access.service';
import { MessagesService } from '../services/dialog/message.service';
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
  private api = environment.apiUrl; 
  titulo: string = '';
  icon: string = '';
  userPermissions: any;
  constructor(private http: HttpClient, private router: Router, private AccesService: AccesService, private MessagesService: MessagesService) { }

  login(body: any): Observable<any> {
    const url = `${this.api}/login/`;
  
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(res => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('iduser', res.iduser);
        sessionStorage.setItem('name', res.name);
        sessionStorage.setItem('rol', res.rol);
        const id =  res.iduser
        this.getPermissions(id);
      })
    );
  }

  getPermissions(id: any){
    this.AccesService.getPermissions(id).subscribe((data: any) => {
      sessionStorage.setItem('pageaccess', JSON.stringify(data));
      this.router.navigate(['/home']);
    }, (error: any) => {
      console.log(error);
      this.MessagesService.showFailedAccess();
    });
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('iduser');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('rol'); // Agrega esta línea para eliminar el nombre de usuario
    this.router.navigate(['/']);
  }

  getUserPermissions() {
    const permisosString = sessionStorage.getItem('pageaccess');
    this.userPermissions = permisosString ? JSON.parse(permisosString) : null;
    // Verifica si permisosString es null y proporciona un valor predeterminado si es así
    return permisosString ? JSON.parse(permisosString) : null;
  }

  hasPermission(componentId: string, action: string): boolean {
    return this.userPermissions.some(
      (permission:any) => permission.idcomponente == componentId && permission[action] === 1
    );
  }
  

  getIdUser(): any {
    const idUser = sessionStorage.getItem('iduser');
    return idUser !== null ? idUser : '';
  }

  getUsername(): string {
    const username = sessionStorage.getItem('name');
    return username !== null ? username : '';
  }

  getRol(): string {
    const rol = sessionStorage.getItem('rol');
    return rol !== null ? rol : '';
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // Devuelve true si existe un token almacenado, de lo contrario, devuelve false
  }

  setTitle(title: string, icon: string): void {
    this.titulo = title;
    this.icon = icon
  }

  getTitle(): string {
    return this.titulo;
  }

  getIcon(): string{
    return this.icon;
  }
}
