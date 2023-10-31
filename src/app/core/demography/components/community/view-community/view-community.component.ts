import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditCommunityComponent } from '../create-edit-community/create-edit-community.component';
import { Table } from 'primeng/table';
import { Community } from 'src/app/models/demography';
import { CommunityService } from 'src/app/core/demography/services/community.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
    public ref2: DynamicDialogRef,
    private ShareDataService: ShareDataService,
    private communityService: CommunityService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService
  ) {
    this.ShareDataService.selectedValue$.subscribe((value) => {
      this.dataSelected = value;
    });
  }

  ngOnInit(): void {
  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.communityService.get(this.dataSelected, event).subscribe((data) => {
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
    this.ref2.close();
    this.dialogService.open(CreateEditCommunityComponent, {
      context: {
        id
      }
    }).onClose.subscribe(res => this.refreshTable());
  }

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }

  dialogDelete(id: number) {
    this.ref2.close();
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed') {
        this.communityService.delete(id).subscribe(res => {
          this.MessagesService.showConfirmDelete();
          this.refreshTable();
        }, (err) => {
          this.MessagesService.showMsjError(err.error.message);
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

