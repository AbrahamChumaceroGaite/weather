
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { Table } from 'primeng/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/user/services/user.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  userData: User[] = [];
  loading: boolean = true;
  filterValue: string = '';
 
  constructor(private userService: UserService,   
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.userService.get().subscribe((data:User[]) => {
      this.userData = data;
      this.loading = false
    })
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditUserComponent, {
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
        this.userService.delete(id).subscribe(res=>{
            this.MessagesService.showConfirmDelete();
            this.getData();
        },(err)=>{
          this.MessagesService.showError();
        })
      }
    })

  }

}
