import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from 'src/app/models/demography';
import { DepartmentService } from '../../services/department.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { NbDialogService } from '@nebular/theme';
import { CreateEditLocationComponent } from '../location/create-edit-location/create-edit-location.component';

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
  loading: boolean = true;
  filterValue: string = '';
  totalRecords = 0;
  totalUsers = 0;

  constructor(
    private DepartmentService: DepartmentService,
    private dialogService: NbDialogService,
    private AuthService: AuthService,
    private ShareDataService: ShareDataService,
    private MessagesService: MessagesService) { }


  ngOnInit(): void {
    this.getData();
  }

  setTitle(name: string) {
    this.AuthService.setTitle(name, '');
  }

  getData(): void {
    this.DepartmentService.getList().subscribe(data => {
      this.items = data
      this.idDepartment = this.items[0].id;
      this.setTitle( ' Demografia - ' + this.items[0].name);
    });
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

  dialog(id?: number) {
    this.dialogService.open(CreateEditLocationComponent, {
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

  onRowSelect(event: any) {
    this.loading = true;
    this.idDepartment = event;
    const name = this.items.find(x => x.id === event)?.name;
    this.setTitle( ' Demografia - ' + name);
    this.refreshTable();
  }

  refreshTable() {
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.getTableData(lazyLoadEvent);
  }

  
}
