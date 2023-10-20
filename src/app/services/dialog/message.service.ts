import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toastrService: NbToastrService) {}

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

  showImageError(): void {
    this.toastrService.warning(
      'El formato es Incorrecto. Debe ser 300x300 y en formato .PNG',
      '¡Uh, oh! Eso esta mal'
    );
  }
}
