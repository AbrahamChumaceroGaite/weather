import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from '../../../../services/dialog/message.service'
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { AuthService } from 'src/app/auth/auth.service';
import { StructureService } from 'src/app/core/structure/services/structure.service';

@Component({
  selector: 'app-create-edit-component',
  templateUrl: './create-edit-component.component.html',
  styleUrls: ['./create-edit-component.component.scss'],
})
export class CreateEditComponentComponent implements OnInit {
  @Input() idmodule!: number;
  @Input() id!: number;
  moduleData: any[] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  selectedModule: any;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;
  constructor(
    private AuthService: AuthService,
    private StructureService: StructureService,
    private confirmService: ConfirmService,
    private messageService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditComponentComponent>
  ) { }

  ngOnInit(): void {
    this.getForm();
    this.getData();
  }

  getData() {
    this.StructureService.getModule().subscribe((data: any[]) => {
      this.moduleData = data;
    })
  }
  getForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      idmodule: this.idmodule,
      autor: this.AuthService.getIdUser(),
    });
    if (this.id) {
      this.StructureService.getComponentById(this.id).subscribe((data: any[]) => {
        console.log(data)
        for (let i of data) {
          this.submitButtonText = 'Actualizar';
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['idmodule'].setValue(i.idmodule);
          this.form.controls['name'].setValue(i.name);
        }
      }
      );
    }  else {
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
      this.saveForm(formValue);
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveForm(formValue: any) {
    if (this.id) {
      this.confirmService.editDialog(this.formTitle).then((result) => {
        if (result === 'Confirmed') {
          this.StructureService.putComponent(this.id, formValue).subscribe(
            (res) => {
              this.messageService.showConfirmEdit();
              this.cancel();
              this.loading = false;
            },
            (err) => {
              this.messageService.showMsjError(err);
              this.loading = false;
            }
          );
        }
      });
    } else {
      this.StructureService.postComponent(formValue).subscribe(
        (res) => {
          this.messageService.showConfirmPost();
          this.cancel();
        },
        (err) => {
          this.messageService.showMsjError(err);
          this.cancel();
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }
}
