import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from 'src/app/models/demography';
import { DepartmentService } from '../../services/department.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { createProvince, showProvince, createCommunity, showCommunity, createMunicipality, showMunicipality, createLocation, showLocation } from '../../functions/modals';
import { MenuItem } from 'primeng/api';
import { menu } from '../../utils/menu';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-admin-demography',
  templateUrl: './admin-demography.component.html',
  styleUrls: ['./admin-demography.component.scss']
})
export class AdminDemographyComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  idDepartment: number = 0;
  items: Department[] = [];
  itemsTable: any[] = [];

  itemsMenu: MenuItem[] = menu;
  loading: boolean = true;
  filterValue: string = '';
  totalRecords = 0;
  totalUsers = 0;

  constructor(
    private ShareDataService: ShareDataService,
    private DepartmentService: DepartmentService,
    private AuthService: AuthService,
    private DialogService: DialogService,
    private NbDialogService: NbDialogService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.getMenuItems();
    this.getData();
  }

  getData(): void {
    this.DepartmentService.getList().subscribe(data => {
      this.items = data
      this.idDepartment = this.items[0].id;
      this.ShareDataService.setSelectedValue(this.idDepartment);
      this.setTitle(' Demografia - ' + this.items[0].name);
    });
  }

  getMenuItems() {
    this.itemsMenu = [
      {
        label: 'Provincia',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              createProvince(this.NbDialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
          {
            label: 'Registros',
            icon: 'pi pi-fw pi-align-justify',
            command: () => {
              showProvince(this.DialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
        ]
      },
      {
        label: 'Municipio',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              createMunicipality(this.NbDialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
          {
            label: 'Registros',
            icon: 'pi pi-fw pi-align-justify',
            command: () => {
              showMunicipality(this.DialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
        ]
      },
      {
        label: 'Comunidad',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              createCommunity(this.NbDialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
          {
            label: 'Registros',
            icon: 'pi pi-fw pi-align-justify',
            command: () => {
              showCommunity(this.DialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
        ]
      },
      {
        label: 'Locacion',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              createLocation(this.NbDialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
          {
            label: 'Registros',
            icon: 'pi pi-fw pi-align-justify',
            command: () => {
              showLocation(this.DialogService).then((ref) => {
                this.refreshTable();
              });
            }
          },
        ]
      }
    ];


  }

  getTableData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.DepartmentService.get(this.idDepartment, event).subscribe((data) => {
        this.itemsTable = data.items;
        this.totalRecords = data.totalRecords;
        this.totalUsers = data.totalUsers;
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.MessagesService.showMsjError(error.error.message)
      });
    }, 1000);
  }

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }

  onRowSelect(event: any) {
    this.loading = true;
    this.idDepartment = event;
    const name = this.items.find(x => x.id === event)?.name;
    this.setTitle('Demografia - ' + name);
    this.ShareDataService.setSelectedValue(event);
    this.refreshTable();
  }

  setTitle(name: string) {
    this.AuthService.setTitle(name, '');
  }

  refreshTable() {
    this.loading = true;
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.getTableData(lazyLoadEvent);
  }

}
