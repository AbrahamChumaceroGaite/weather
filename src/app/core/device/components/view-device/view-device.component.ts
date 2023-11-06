
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditDeviceClientComponent } from '../create-edit-device-client/create-edit-device-client.component';
import { CreateEditDeviceComponent } from '../create-edit-device/create-edit-device.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Table } from 'primeng/table';
import { DeviceID } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { LazyLoadEvent } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Menu_generic } from 'src/app/templates/menu_generic';
import { ViewDeviceReadComponent } from '../view-device-read/view-device-read.component';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.scss']
})

export class ViewDeviceComponent {
  @ViewChild('dt') dt!: Table;
  items: DeviceID[] = [];
  itemsMenu: MenuItem[] = Menu_generic;
  totalRecords = 0;
  totalUsers = 0;
  loading: boolean = true;
  filterValue: string = '';

  room: string = 'Testing'

  constructor(
    private AuthService: AuthService,
    private deviceService: DeviceService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.setTitle();
    this.getMenuItems();

  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.deviceService.getIdentity(event).subscribe((data: any) => {
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

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditDeviceComponent, {
      context: {
        id
      }
    }).onClose.subscribe(res => this.refreshTable());
  }

  dialogData(id?: number) {
    this.dialogService.open(ViewDeviceReadComponent, {
      context: {
        id
      }
    });
  }

  dialoClient(id?: number) {
    this.dialogService.open(CreateEditDeviceClientComponent, {
      context: {
        id
      }
    }).onClose.subscribe(res => this.refreshTable());
  }

  dialogDelete(id: number) {
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed') {
        this.deviceService.deleteIdentity(id).subscribe(res => {
          this.MessagesService.showConfirmDelete();
          this.refreshTable();
        }, (err) => {
          this.MessagesService.showMsjError(err.error.message);
        })
      }
    })

  }

  setTitle() {
    this.AuthService.setTitle("Dispositivos", '');
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

