import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditCommunityComponent } from '../create-edit-community/create-edit-community.component';
import { Table } from 'primeng/table';
import { Community } from 'src/app/models/demography';
import { CommunityService } from 'src/app/core/demography/services/community.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-view-community',
  templateUrl: './view-community.component.html',
  styleUrls: ['./view-community.component.scss']
})

export class ViewCommunityComponent {
  @ViewChild('dt') dt!: Table;
  items: Community[] = [];
  totalRecords = 0;
  loading: boolean = true;
  filterValue: string = '';
  dataSelected: any;
  constructor(
    private AuthService: AuthService,
    private communityService: CommunityService,
    private shareDataService: ShareDataService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService
  ) {
    this.shareDataService.selectedValue$.subscribe((value) => {
      console.log("value", value)
      this.dataSelected = value;
    });
  }

  ngOnInit(): void {
    this.setTitle();

  }

  setTitle() {
    this.AuthService.setTitle('Comunidades', 'list');
  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.communityService.get(event).subscribe((data) => {
        this.items = data.items;
        this.totalRecords = data.totalRecords;
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.MessagesService.showMsjError(error.error.message)
      });
    }, 1000);
  }

  dialog(id?: number) {
    this.dialogService.open(CreateEditCommunityComponent, {
      context: {
        id
      }
    }).onClose.subscribe(res => this.refreshTable());
  }

  filterByName(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    if (value) {
      this.filterValue = value.trim().toLowerCase();
      this.dt.filter(this.filterValue, 'name', 'contains');
    }
  }

  dialogDelete(id: number) {
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed') {
        this.communityService.delete(id).subscribe(res => {
          this.MessagesService.showConfirmDelete();
          this.refreshTable();
        }, (err) => {
          this.MessagesService.showError();
        })
      }
    })
  }

  refreshTable() {
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.getData(lazyLoadEvent);
  }

}

