import { Component, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MessagesService } from '../../../../services/dialog/message.service'
import { StructureService } from 'src/app/core/structure/services/structure.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { CreateEditComponentComponent } from '../create-edit-component/create-edit-component.component';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/auth/auth.service';
import { LazyLoadEvent } from 'primeng/api';
import { CreateEditModuleComponent } from '../create-edit-module/create-edit-module.component';
import { ConstStructID } from 'src/app/templates/components-id';


@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.scss'],
})
export class ViewComponentComponent {
  @ViewChild('dt') dt!: Table;
  ConstStructID = ConstStructID;
  structureData: any;
  moduleData: any;
  selectedModule: any;
  componentData: any;
  loading: boolean = true;
  searchText!: string;

  constructor(
    private StructureService: StructureService,
    private dialogService: NbDialogService,
    private confirmService: ConfirmService,
    public AuthService: AuthService,
    private messageService: MessagesService) {

  }

  ngOnInit(): void {
    this.getModules();
  }

  getModules() {
    this.loading = true;
    this.StructureService.getModule().subscribe((data: any[]) => {
      this.moduleData = data;
      console.log(data)
      this.selectedModule = data[0].id;
      this.AuthService.setTitle(data[0].nombre, 'pi pi-box');
      this.loading = false;
      this.loadData()
    }, (error) => {
      this.loading = false;
     });
  }

  loadData() {
    this.loading = true;
    setTimeout(() => {
      this.StructureService.getComponent(this.selectedModule ).subscribe((data: any[]) => {
        this.structureData = data
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.messageService.showMsjError(error.error.mensaje)
      });
    }, 1000);
  }

  dialogCreateEdit(idmodule?: number, id?: number) {
    this.dialogService
      .open(CreateEditComponentComponent, {
        context: {
          idmodule: this.selectedModule,
          id,
        },
      })
      .onClose.subscribe((res) => this.loadData());
  }

  dialogDelete(id: number) {
    this.confirmService.deleteDialog(id).then((result) => {
      if (result === 'Confirmed') {
        this.StructureService.deleteComponent(id).subscribe(
          (res) => {
            this.messageService.showConfirmDelete();
            this.loadData();
          },
          (err) => {
            this.messageService.showError();
          }
        );
      }
    });
  }

  dialogCreateEditModules(id?: number) {
    this.dialogService
      .open(CreateEditModuleComponent, {
        context: {
          id,
        },
      })
      .onClose.subscribe((res) => this.getModules());
  }

  dialogDeleteModules(id: number) {
    this.confirmService.deleteDialog(id).then((result) => {
      if (result === 'Confirmed') {
        this.StructureService.deleteModule(id).subscribe(
          (res) => {
            this.messageService.showConfirmDelete();
            this.getModules();
          },
          (err) => {
            this.messageService.showError();
          }
        );
      }
    });
  }

  filterGlobal() {
    if (this.searchText) {
      this.dt.filterGlobal(this.searchText, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }

  filterMenu(event: any) {
    const selected = event.nombre;
    this.AuthService.setTitle(selected, 'pi pi-box');
    this.selectedModule = event.id;
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.loadData();
  }

  refreshTable() {
    this.loadData()
  }
}
