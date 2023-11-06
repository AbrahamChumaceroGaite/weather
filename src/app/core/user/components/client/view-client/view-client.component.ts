
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditClientComponent } from '../create-edit-client/create-edit-client.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/core/user/services/client.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Menu_generic } from 'src/app/templates/menu_generic';


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  items: Client[] = [];
  filterValue: string = '';

  itemsMenu: MenuItem[] = Menu_generic;
  loading: boolean = true;
  totalRecords = 0;
  totalUsers = 0;
  dataSelected: any;
  rolSelected: any;

  constructor(
    private AuthService: AuthService,
    private clientService: ClientService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.setTitle();
    this.getMenuItems();
  }


  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.clientService.get(event).subscribe((data) => {
        this.items = data.items;
        this.totalRecords = data.totalRecords;
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.MessagesService.showMsjError(error.error.message)
      });
    }, 1000);
  }

  getMenuItems() {
    this.itemsMenu = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: (event: any) => {
          this.dialog();
        }
      }
    ]
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditClientComponent, {
      context: {
        id
      }
    }).onClose.subscribe(res => this.refreshTable());
  }

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }


  setTitle() {
    this.AuthService.setTitle("Clientes", '');
  }

  dialogDelete(id: number) {
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed') {
        this.clientService.delete(id).subscribe(res => {
          this.MessagesService.showConfirmDelete();
          this.refreshTable();
        }, (err) => {
          this.MessagesService.showError();
        })
      }
    })

  }

  refreshTable() {
    this.loading = true;
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.getData(lazyLoadEvent);
  }

}
