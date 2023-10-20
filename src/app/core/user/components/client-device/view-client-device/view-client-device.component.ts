
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditClientDeviceComponent } from '../create-edit-client-device/create-edit-client-device.component';
import { Table } from 'primeng/table';
import { ClientDevice } from 'src/app/models/clientdevice';
import { ClientDeviceService } from 'src/app/core/device/services/clientdevice.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessageService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-view-client-device',
  templateUrl: './view-client-device.component.html',
  styleUrls: ['./view-client-device.component.scss']
})
export class ViewClientDeviceComponent {
  @ViewChild('dt') dt!: Table;
  clientDeviceData: ClientDevice[] = [];
  loading: boolean = true;
  filterValue: string = '';

  constructor(private clientDeviceService: ClientDeviceService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.clientDeviceService.get().subscribe((data:ClientDevice[]) => {
      this.clientDeviceData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditClientDeviceComponent, {
      context: {
        id
      }
    }).onClose.subscribe( res=> this.getData());
  }

  filterByName(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    if (value) {
      this.filterValue = value.trim().toLowerCase();
      this.dt.filter(this.filterValue, 'client', 'contains');
    }
  }
  
  dialogDelete(id: number){
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed'){
        this.clientDeviceService.delete(id).subscribe(res=>{
            this.messageService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.messageService.showError();
        })
      }
    })

  }

}
