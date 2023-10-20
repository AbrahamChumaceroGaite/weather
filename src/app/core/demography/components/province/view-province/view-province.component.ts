import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditProvinceComponent } from '../create-edit-province/create-edit-province.component';
import { Table } from 'primeng/table';
import { Province } from 'src/app/models/demography';
import { ProvinceService } from 'src/app/core/demography/services/province.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessageService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-view-province',
  templateUrl: './view-province.component.html',
  styleUrls: ['./view-province.component.scss']
})
export class ViewProvinceComponent {
  @ViewChild('dt') dt!: Table;
  provinceData: Province[] = [];
  loading: boolean = true;
  filterValue: string = '';

  constructor(private provinceService: ProvinceService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.provinceService.get().subscribe((data:Province[]) => {
      this.provinceData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditProvinceComponent, {
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
        this.provinceService.delete(id).subscribe(res=>{
            this.messageService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.messageService.showError();
        })
      }
    })
  }

}
