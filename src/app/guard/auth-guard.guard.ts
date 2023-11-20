import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/welcome']);
      return false;
    }
  }

  hasPermission(userPermissions: any, component: string, action: any): boolean {
    // Verificar si el usuario tiene permisos para realizar una acción en un componente
    if (userPermissions) {
      return userPermissions.some((permission:any) => {
        const idcomponente = permission.idcomponent;
        const idcomponentes = component;
        const acciones = permission;
        const actionValue = permission[action]; /* 
        console.log("Id Componente?: ", idcomponente);
        console.log("Componente Solicitado?: ", idcomponentes)
        console.log("Acciones?", acciones)
        console.log("Accion solicitada?: ", action)
        console.log("Accion?: ", actionValue) */
        return (
          permission.idcomponente == component && actionValue == 1 // Compara con el valor requerido
        );
      });
    }
    return false; // Si no se encuentran permisos, se considera como acceso denegado
  }
}
