
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditClientComponent } from '../create-edit-client/create-edit-client.component';
import { Table } from 'primeng/table';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/core/user/services/client.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  clientData: Client[] = [];
  loading: boolean = true;
  filterValue: string = '';

  constructor(private clientService: ClientService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.clientService.get().subscribe((data:Client[]) => {
      this.clientData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditClientComponent, {
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
        this.clientService.delete(id).subscribe(res=>{
            this.MessagesService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.MessagesService.showError();
        })
      }
    })

  }

}
