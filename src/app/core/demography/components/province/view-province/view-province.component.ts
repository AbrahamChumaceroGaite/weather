import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditProvinceComponent } from '../create-edit-province/create-edit-province.component';
import { Table } from 'primeng/table';
import { Province } from 'src/app/models/demography';
import { ProvinceService } from 'src/app/core/demography/services/province.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-view-province',
  templateUrl: './view-province.component.html',
  styleUrls: ['./view-province.component.scss']
})

export class ViewProvinceComponent {
  @ViewChild('dt') dt!: Table;
  items: Province[] = [];
  totalRecords = 0;
  loading: boolean = true;
  filterValue: string = '';
  dataSelected: any;

  constructor(
    public ref2: DynamicDialogRef,
    private ShareDataService: ShareDataService,
    private provinceService: ProvinceService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    ) {
      this.ShareDataService.selectedValue$.subscribe((value) => {
        this.dataSelected = value;
        this.refreshTable();
      });
    }

  ngOnInit(): void {

  }

  getData(event: LazyLoadEvent) {
    setTimeout(() => {
      this.provinceService.get(this.dataSelected, event).subscribe((data) => {
         
        this.items = data.items;
        this.totalRecords = data.totalRecords;
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.MessagesService.showMsjError(error.error.message)
      });
    }, 1000);
  }

  dialog(id: number) {
    this.ref2.close();
    this.dialogService.open(CreateEditProvinceComponent, {
      context: {
        id
      }
    }).onClose.subscribe(res => this.ref2.close());
  }

  filterByName() {
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
        this.provinceService.delete(id).subscribe(res => {
          this.MessagesService.showConfirmDelete();
          this.ref2.close();
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
