
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { CreateEditUserRolComponent } from '../create-edit-user-rol/create-edit-user-rol.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/user/services/user.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Menu_generic } from 'src/app/templates/menu_generic';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  items: User[] = [];
  rols: Rol[] = [];
  filterValue: string = '';
 
  itemsMenu: MenuItem[] = Menu_generic;
  loading: boolean = true;
  totalRecords = 0;
  totalUsers = 0;
  dataSelected: any;
  rolSelected: any;

  constructor(
    private ShareDataService: ShareDataService,
    private AuthService: AuthService,
    private userService: UserService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) {
      this.ShareDataService.selectedValue$.subscribe((value) => {
        this.dataSelected = value;
      });
     }

  ngOnInit(): void {
    this.getRols();
    this.getMenuItems();
  }

  getRols(){
    this.ShareDataService.getRolList().subscribe((data: Rol[]) => {
      this.rols = data;
      this.dataSelected = this.rols[0].id;
      this.loading = false;
      this.setTitle(this.rols[0].rol) 
    })
  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.userService.get(this.dataSelected, event).subscribe((data) => {
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
    this.itemsMenu = Menu_generic.map((item: any) => {
      const convertedItem: MenuItem = {
        label: item.label,
        icon: item.icon,
        command: (event: any) => this.handleCommand(item.command.toString()),
      };
      return convertedItem;
    });
  }

  handleCommand(command: string) {
    switch (command) {
      case "() => 'New'":
        this.dialog();
        break;
    }
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditUserComponent, {
      context: {
        id
      }
    }).onClose.subscribe( res=> this.refreshTable());
  }

  dialogRol(id?: number) {
    this.dialogService.open(CreateEditUserRolComponent, {
      context: {
        id
      }
    }).onClose.subscribe( res=> this.refreshTable());
  }

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }
  
  dialogDelete(id: number){
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed'){
        this.userService.delete(id).subscribe(res=>{
            this.MessagesService.showConfirmDelete();
            this.refreshTable();
        },(err)=>{
          this.MessagesService.showError();
        })
      }
    })

  }

  onRolSelected(event: any){
    this.dataSelected = event.id;
    this.refreshTable();
    this.setTitle(event.rol);
  }

  setTitle(name: any) {
    this.AuthService.setTitle("Operador - " + name, '');
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
