import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { PersonService } from '../../services/person.service';
import { Person } from 'src/app/models/person';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { ShareDataService} from 'src/app/services/shared/shared.service';
import { Location } from 'src/app/models/demography';

@Component({
  selector: 'app-create-edit-person',
  templateUrl: './create-edit-person.component.html',
  styleUrls: ['./create-edit-person.component.scss']
})
export class CreateEditPersonComponent {
  @Input() id!: number;
  locations: Location[] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = true;
  visible = true;

  constructor(
    private personService: PersonService,
    private locationService: ShareDataService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditPersonComponent>
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.checkForm();
  }

  loadForm() {
    this.form = this.fb.group({
      idlocation: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ\s]*$/), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ\s]*$/), Validators.maxLength(50)]],
      ci: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
    });
    this.locationService.getLocationList().subscribe((data: Location[]) => {
      this.locations = data;
      this.loading = false;
    });
  }

  checkForm() {
    if (this.id) {
      this.personService.getById(this.id).subscribe((data: Person[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['idlocation'].setValue(i.idlocation);
          this.form.controls['name'].setValue(i.name);
          this.form.controls['lastname'].setValue(i.lastname);
          this.form.controls['ci'].setValue(i.ci);
          this.form.controls['phone'].setValue(i.phone);
          this.form.controls['email'].setValue(i.email);
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nueva Persona';
      this.submitButtonText = 'Crear';
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
          this.personService.put(this.id, formValue).subscribe(
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
      this.personService.post(formValue).subscribe((res) => {
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
