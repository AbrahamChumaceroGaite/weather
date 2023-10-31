import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditMunicipalityComponent } from '../create-edit-municipality/create-edit-municipality.component';
import { Table } from 'primeng/table';
import { Municipality } from 'src/app/models/demography';
import { MunicipalityService } from 'src/app/core/demography/services/municipality.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-view-municipality',
  templateUrl: './view-municipality.component.html',
  styleUrls: ['./view-municipality.component.scss']
})

export class ViewMunicipalityComponent {
  @ViewChild('dt') dt!: Table;
  items: Municipality[] = [];
  totalRecords = 0;
  loading: boolean = true;
  filterValue: string = '';
  dataSelected: any;

  constructor(
    public ref2: DynamicDialogRef,
    private ShareDataService: ShareDataService,
    private municipalityService: MunicipalityService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) {
    this.ShareDataService.selectedValue$.subscribe((value) => {
      this.dataSelected = value;
      this.refreshTable();
    });
  }

  ngOnInit(): void {
  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.municipalityService.get(this.dataSelected, event).subscribe((data) => {
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
    this.dialogService.open(CreateEditMunicipalityComponent, {
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
        this.municipalityService.delete(id).subscribe(res => {
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
