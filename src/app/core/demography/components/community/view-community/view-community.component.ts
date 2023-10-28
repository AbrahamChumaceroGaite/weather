import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditCommunityComponent } from '../create-edit-community/create-edit-community.component';
import { Table } from 'primeng/table';
import { Community } from 'src/app/models/demography';
import { CommunityService } from 'src/app/core/demography/services/community.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-view-community',
  templateUrl: './view-community.component.html',
  styleUrls: ['./view-community.component.scss']
})
export class ViewCommunityComponent {
  @ViewChild('dt') dt!: Table;
  communityData: Community[] = [];
  loading: boolean = true;
  filterValue: string = '';
  constructor(private communityService: CommunityService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.communityService.get().subscribe((data:Community[]) => {
      this.communityData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditCommunityComponent, {
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
        this.communityService.delete(id).subscribe(res=>{
            this.MessagesService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.MessagesService.showError();
        })
      }
    })
  }

}

