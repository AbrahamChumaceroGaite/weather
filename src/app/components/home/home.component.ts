import { Component } from '@angular/core';
import { LoginComponent } from '../../core/login/components/login/login.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  [x: string]: any;
  displayLoginModal: boolean = false;
  constructor(private dialogService: NbDialogService) {}
  toggleSidebar(): void {
    // Lógica para mostrar/ocultar la barra lateral
  }

  openLoginDialog(): void {
    this.dialogService.open(LoginComponent, {
    }).onClose.subscribe( );
  }

  showLoginModal(): void {
    this.displayLoginModal = true;
  }

  closeLoginModal(): void {
    this.displayLoginModal = false;
  }
}
