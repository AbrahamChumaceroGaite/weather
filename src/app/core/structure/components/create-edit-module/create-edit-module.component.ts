import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from '../../../../services/dialog/message.service'
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { AuthService } from 'src/app/auth/auth.service';
import { StructureService } from 'src/app/core/structure/services/structure.service';

@Component({
  selector: 'app-create-edit-module',
  templateUrl: './create-edit-module.component.html',
  styleUrls: ['./create-edit-module.component.scss'],
})
export class CreateEditModuleComponent {
  @Input() id!: number;
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;

  constructor(
    private AuthService: AuthService,
    private StructureService: StructureService,
    private confirmService: ConfirmService,
    private messageService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditModuleComponent>
  ) {}

  ngOnInit(): void {
    this.getForm(this.id);
  }

  getForm(id?: number) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      autor: this.AuthService.getIdUser(),
    });
    if (id) {
      this.StructureService.getModuleById(this.id).subscribe((data: any[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['name'].setValue(i.name);
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nuevo Modulo';
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
          this.StructureService.putModule(this.id, formValue).subscribe(
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
      this.StructureService.postModule(formValue).subscribe(
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
