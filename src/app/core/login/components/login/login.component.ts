import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  pass: string = '';
  visible = true;
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastr: NbToastrService,
    private dialogRef: NbDialogRef<LoginComponent>
  ) { }

  onSubmit(): void {
    const body: any = {
      email: this.email,
      pass: this.pass
    };    
    this.authService.login(body).subscribe(
        (res: any) => {
          console.log('Inicio de sesión exitoso:', res);
          this.router.navigate(['/home/admin/device']);
          // Redireccionar al usuario después de iniciar sesión


          // Mostrar mensaje de bienvenida
          this.toastr.success('¡Bienvenido!', 'Inicio de sesión exitoso');
        },
        (error: any) => {
          console.log('Error al iniciar sesión:', error);
          // Mostrar mensaje de error al usuario
          this.toastr.danger('Error al iniciar sesión', 'Error');
        }
      );
  }
  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }
}
