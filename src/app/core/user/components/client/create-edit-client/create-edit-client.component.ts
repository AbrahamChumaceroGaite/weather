import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/core/user/services/client.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { Person } from 'src/app/models/person';


@Component({
  selector: 'app-create-edit-client',
  templateUrl: './create-edit-client.component.html',
  styleUrls: ['./create-edit-client.component.scss']
})
export class CreateEditClientComponent implements OnInit {
  @Input() id!: number;
  persons: Person[] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  showPassword = false;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;

  constructor(
    private clientService: ClientService,
    private ShareDataService: ShareDataService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditClientComponent>
  ) { }

  ngOnInit(): void {
    
    this.loadForm();
    this.checkForm();

  }

  loadForm() {
    this.form = this.fb.group({
      idperson: ['', Validators.required]      
    });

    this.ShareDataService.getPersonList().subscribe((data: Person[]) => {
      this.persons = data;
      this.loading = false;
    });
  }

  checkForm() {
    if (this.id) {
      this.clientService.getById(this.id).subscribe((data: Client[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.user;
          this.form.controls['idperson'].setValue(i.idperson);
        }
        this.form.markAllAsTouched();
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'person-add';
      this.formTitle = 'Nuevo Cliente';
      this.submitButtonText = 'Crear';
/*       this.form.get('pass')?.setValidators([Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]); */
    };
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
          this.clientService.put(this.id, formValue).subscribe(
            () => {
              this.MessagesService.showConfirmEdit();
              this.cancel();
              this.loading = false;
            },
            (err) => {
              this.MessagesService.showMsjError(err.error.message);
              this.loading = false;
            }
          );
        }
      });
    } else {
      this.clientService.post(formValue).subscribe((res) => {
        this.MessagesService.showConfirmPost();
        this.cancel();
      }, (err) => {
        this.MessagesService.showMsjError(err.error.message);
        this.cancel();
      });
    }
  }


  isInvalid(fieldName: string) {
    const control = this.form.get(fieldName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }

}
