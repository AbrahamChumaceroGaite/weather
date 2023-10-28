import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditMunicipalityComponent } from '../create-edit-municipality/create-edit-municipality.component';
import { Table } from 'primeng/table';
import { Municipality } from 'src/app/models/demography';
import { MunicipalityService } from 'src/app/core/demography/services/municipality.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-view-municipality',
  templateUrl: './view-municipality.component.html',
  styleUrls: ['./view-municipality.component.scss']
})
export class ViewMunicipalityComponent {
  @ViewChild('dt') dt!: Table;
  municipalityData: Municipality[] = [];
  loading: boolean = true;
  filterValue: string = '';
  constructor(private municipalityService: MunicipalityService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.municipalityService.get().subscribe((data:Municipality[]) => {
      this.municipalityData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditMunicipalityComponent, {
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
        this.municipalityService.delete(id).subscribe(res=>{
            this.MessagesService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.MessagesService.showError();
        })
      }
    })
  }

}
