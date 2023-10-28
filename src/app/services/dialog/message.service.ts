import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private toastrService: NbToastrService,
    private MessagesService: MessageService
    ) {}

  showConfirmPost(): void {
    this.toastrService.success('Revise la tabla', 'Registro Exitoso');
  }

  showConfirmEdit(): void {
    this.toastrService.success('Revise los cambios', 'Edicion Exitosa');
  }

  showConfirmDelete(): void {
    this.toastrService.info('Registro Eliminado', 'Eliminado Exitoso');
  }

  showError(): void {
    this.toastrService.danger('Ocurrió un Error', '¡Oh no! Algo salio mal');
  }

  showSuccessLogin(): void {
    this.MessagesService.add({ severity: 'success', summary: 'Bienvenido', detail: '' });
  }

  showFailedLogin(): void {
    this.MessagesService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo iniciar su sesión' });
  }

  showImageError(): void {
    this.toastrService.warning(
      'El formato es Incorrecto. Debe ser 300x300 y en formato .PNG',
      '¡Uh, oh! Eso esta mal'
    );
  }
}
