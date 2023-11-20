import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { AuthService } from 'src/app/auth/auth.service';
import { RolService } from '../../../services/rol.service';
import { AccesService } from '../../../services/access.service';
import { StructureService } from 'src/app/core/structure/services/structure.service';

@Component({
  selector: 'app-create-edit-user-control',
  templateUrl: './create-edit-user-control.component.html',
  styleUrls: ['./create-edit-user-control.component.scss'],
})
export class CreateEditUserControlComponent implements OnInit {
  @Input() idrol!: number;
  @Input() id!: number;
  componentData: any[] = [];
  userData: any[] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  selectedUsuario: any;
  selectedComponente: any;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;

  name : any;
  creat: number = 0;
  edit: number = 0;
  watch: number = 0;
  delet: number = 0;
  formShow: boolean = true;

  constructor(
    private AuthService: AuthService,
    private AccesService: AccesService,
    private StructureService: StructureService,
    private confirmService: ConfirmService,
    private messageService: MessagesService,
    private RolService: RolService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditUserControlComponent>
  ) { }

  ngOnInit(): void {
    this.getForm(this.idrol, this.id);
    this.getData();
  }

  getData() {
    this.RolService.getList().subscribe((data: any) => {
      this.userData = data;
    });
    this.StructureService.getComponentList(this.idrol).subscribe((data: any[]) => {
      this.componentData = data;
    });
  }

  getForm(idrol?: number, id?: number) {
    const idautor = this.AuthService.getIdUser();
    this.form = this.fb.group({
      idrol: idrol,
      idcomponent: ['', Validators.required],
      autor:  parseInt(idautor),
      creat: [0],    // Inicializado a 0 (desactivado)
      edit: [0],   // Inicializado a 0 (desactivado)
      watch: [0],      // Inicializado a 0 (desactivado)
      delet: [0]  // Inicializado a 0 (desactivado)
    });
    if (id) {
      this.AccesService.geTAccessById(this.id).subscribe(
        (data: any[]) => {
          for (let i of data) {
            this.formHeader = 'edit-header';
            this.formlogo = 'edit';
            this.formTitle = `edit: ` + "Permisos";
            this.form.controls['idrol'].setValue(i.idrol);
            this.form.controls['idcomponent'].setValue(i.idcomponent);
            this.form.controls['creat'].setValue(i.creat);
            this.form.controls['edit'].setValue(i.edit);
            this.form.controls['watch'].setValue(i.watch);
            this.form.controls['delet'].setValue(i.delet);
          }
        }
      );
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nuevo Componente';
      this.submitButtonText = 'Enviar';
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.loading = true;
      const formValue = this.form.value;
      formValue.creat = formValue.creat ? 1 : 0;
      formValue.edit = formValue.edit ? 1 : 0;
      formValue.watch = formValue.watch ? 1 : 0;
      formValue.delet = formValue.delet ? 1 : 0;
      this.saveForm(formValue);
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveForm(formValue: any) {
    if (this.id) {
      this.confirmService.editDialog(this.formTitle).then((result) => {
        if (result === 'Confirmed') {
          this.AccesService.putAccess(this.id, formValue).subscribe(
            (res) => {
              this.messageService.showConfirmEdit()
              this.cancel();
              this.loading = false;
            },
            (err) => {
              this.messageService.showMsjError(err.error.mensaje);
              this.loading = false;
            }
          );
        }
      });
    } else {
      this.AccesService.postAccess(formValue).subscribe(
        (res) => {
          this.messageService.showConfirmPost();
          this.cancel();
        },
        (err) => {
          this.messageService.showMsjError(err.error.mensaje);
          this.cancel();
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }

  filterComponent(event: any){
    
    const selecteObject = this.componentData.find(comp => comp.id === event)

    if(selecteObject.nombre.startsWith('View') || selecteObject.nombre.startsWith('Admin') || selecteObject.nombre.startsWith('Lista') ){
      this.formShow = true;
    } else {
      this.formShow = false;
    }
  }

}
