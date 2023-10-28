import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditLocationComponent } from '../create-edit-location/create-edit-location.component';
import { Table } from 'primeng/table';
import { Location } from 'src/app/models/demography';
import { LocationService } from 'src/app/core/demography/services/location.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent {
  @ViewChild('dt') dt!: Table;
  locationData: Location[] = [];
  loading: boolean = true;
  filterValue: string = '';
  constructor(private locationService: LocationService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.locationService.get().subscribe((data:Location[]) => {
      this.locationData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditLocationComponent, {
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
        this.locationService.delete(id).subscribe(res=>{
            this.MessagesService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.MessagesService.showError();
        })
      }
    })
  }

}

