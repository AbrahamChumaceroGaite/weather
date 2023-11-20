import { CreateEditRolComponent } from './../../rol/create-edit-rol/create-edit-rol.component';
import { CreateEditUserControlComponent } from '../create-edit-user-control/create-edit-user-control.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { RolService } from '../../../services/rol.service';
import { AccesService } from '../../../services/access.service';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { ConstAdminID } from 'src/app/templates/components-id';

@Component({
  selector: 'app-view-user-control',
  templateUrl: './view-user-control.component.html',
  styleUrls: ['./view-user-control.component.scss']
})
export class ViewUserControlComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  ConstAdminID = ConstAdminID;
  userControlData: any;
  rolData: any;
  loading: boolean = true;
  searchText!: string;
  selectedRol: any;

  constructor(  
    private RolService: RolService,
    private AccesService: AccesService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    public AuthService: AuthService,
    private messageService: MessagesService
    ) { }

  ngOnInit(): void {
    this.getRols()
  }

  getRols(){    
    this.RolService.getList().subscribe((data: any[]) => {
      this.rolData = data;      
      this.selectedRol = data[0].id;
      this.AuthService.setTitle(data[0].rol, 'pi pi-pencil');
      this.loading = false;
      this.loadData();
    });
  }

  loadData() {
    this.loading = true;
    setTimeout(() => {
      this.AccesService.getAccess(this.selectedRol).subscribe((data: any[])=>{
        this.userControlData = data
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.messageService.showMsjError(error.error.mensaje)
      });
    }, 1000);
  }

  dialogCreateEdit(idrol: number = this.selectedRol, id?: number) {
    this.dialogService
      .open(CreateEditUserControlComponent, {
        context: {
          idrol,
          id
        },
      })
      .onClose.subscribe((res) => this.refreshTable());
  }

  dialogDelete(id: number) {
    this.confirmService.deleteDialog(id).then((result) => {
      if (result === 'Confirmed') {
        this.AccesService.deleteAccess(id).subscribe(
          (res) => {
            this.messageService.showConfirmDelete();
            this.refreshTable()
          },
          (err) => {
            this.messageService.showError();
          }
        );
      }
    });
  }

  dialogCreateEditRols(id?: number) {
    this.dialogService
      .open(CreateEditRolComponent, {
        context: {
          id,
        },
      })
      .onClose.subscribe((res) => this.getRols());
  }

  dialogDeleteRols(id: number) {
    this.confirmService.deleteDialog(id).then((result) => {
      if (result === 'Confirmed') {
        this.RolService.delete(id).subscribe(
          (res) => {
            this.messageService.showConfirmDelete();
            this.getRols();
          },
          (err) => {
            this.messageService.showError();
          }
        );
      }
    });
  }

  filterGlobal() {
    if (this.searchText) {
      this.dt.filterGlobal(this.searchText, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }

  filterMenu(event:any) {
    const selected = event.rol;
    this.AuthService.setTitle(selected, 'pi pi-pencil');
    this.selectedRol = event.id;
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.loadData();
  }

  onRolChange(event: any) {
    this.selectedRol = event.id;
    this.loadData()
  }

  refreshTable() {
    this.loadData()
  }

  onRolClean(){
    this.selectedRol = "";
    this.userControlData = []
  }
}
