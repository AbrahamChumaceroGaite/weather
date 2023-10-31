
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditDeviceComponent } from '../create-edit-device/create-edit-device.component';
import { Table } from 'primeng/table';
import { DeviceID } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.scss']
})
export class ViewDeviceComponent {
  @ViewChild('dt') dt!: Table;
  deviceIdData: DeviceID[] = [];
  loading: boolean = true;
  filterValue: string = '';

  constructor(private deviceService: DeviceService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.deviceService.getIdentity().subscribe((data:DeviceID[]) => {
      this.deviceIdData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditDeviceComponent, {
      context: {
        id
      }
    }).onClose.subscribe( res=> this.getData());
  }

  filterByName(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    if (value) {
      this.filterValue = value.trim().toLowerCase();
      this.dt.filter(this.filterValue, 'name', 'contains');
    }
  }
  
  dialogDelete(id: number){
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed'){
        this.deviceService.deleteIdentity(id).subscribe(res=>{
            this.MessagesService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.MessagesService.showMsjError(err.error.message);
        })
      }
    })

  }

}

