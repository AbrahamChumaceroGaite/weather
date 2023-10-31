import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditLocationComponent } from '../create-edit-location/create-edit-location.component';
import { Table } from 'primeng/table';
import { Location } from 'src/app/models/demography';
import { LocationService } from 'src/app/core/demography/services/location.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent {
  @ViewChild('dt') dt!: Table;
  items: Location[] = [];
  totalRecords = 0;
  loading: boolean = true;
  filterValue: string = '';
  dataSelected: any;

  constructor(
    private locationService: LocationService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private ShareDataService: ShareDataService) {
    this.ShareDataService.selectedValue$.subscribe((value) => {
      this.dataSelected = value;
      this.refreshTable();
    });
  }

  ngOnInit(): void {
  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.locationService.getLazy(this.dataSelected, event).subscribe((data) => {
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
    this.dialogService.open(CreateEditLocationComponent, {
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
        this.locationService.delete(id).subscribe(res => {
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

