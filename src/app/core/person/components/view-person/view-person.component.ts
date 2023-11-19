import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonService } from '../../services/person.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Menu_generic } from 'src/app/templates/menu_generic';
import { NbDialogService } from '@nebular/theme';
import { CreateEditPersonComponent } from '../create-edit-person/create-edit-person.component';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.scss']
})
export class ViewPersonComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  items: Person[] = [];

  itemsMenu: MenuItem[] = Menu_generic;
  loading: boolean = true;
  filterValue: string = '';
  totalRecords = 0;
  totalUsers = 0;

  constructor(
    private PersonService: PersonService,
    private AuthService: AuthService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.setTitle();
    this.getMenuItems();
  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.PersonService.get(event).subscribe((data) => {
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
    this.itemsMenu =[
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: (event: any) => {
          this.dialog();
        }
    }
    ]
  }

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }

  dialog(id?: number) {
  }

  dialogDelete(id: number) {
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed') {
        this.PersonService.delete(id).subscribe(res => {
          this.MessagesService.showConfirmDelete();
          this.refreshTable();
        }, (err) => {
          this.MessagesService.showError();
        })
      }
    })

  }

  setTitle() {
    this.AuthService.setTitle("Personas", '');
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
