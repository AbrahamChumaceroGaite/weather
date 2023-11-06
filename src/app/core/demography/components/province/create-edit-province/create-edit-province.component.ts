import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { DepartmentService } from 'src/app/core/demography/services/department.service';
import { ProvinceService } from 'src/app/core/demography/services/province.service';
import { Department, Province } from 'src/app/models/demography';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-edit-province',
  templateUrl: './create-edit-province.component.html',
  styleUrls: ['./create-edit-province.component.scss']
})
export class CreateEditProvinceComponent {
  @Input() id!: number;
  deparments: Department[] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = true;
  visible = true;

  constructor(
    private AuthService: AuthService,
    private departmentService: DepartmentService,
    private provinceService: ProvinceService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditProvinceComponent>
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.checkForm();
  }

  loadForm() {
    const idautor = this.AuthService.getIdUser();
    this.form = this.fb.group({
      iddepartment: ['', Validators.required],
      name: ['', Validators.required],
      idautor: parseInt(idautor)
    });

    this.getDeparment();
  }

  checkForm() {
    if (this.id) {
      this.provinceService.getById(this.id).subscribe((data: Province[]) => {
        for (let i of data) {
          this.loading = false;
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['iddepartment'].setValue(i.iddepartment);
          this.form.controls['name'].setValue(i.name);
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nueva Provincia';
      this.submitButtonText = 'Crear';
    };
  }

  getDeparment() {
    this.departmentService.getList().subscribe((data: Department[]) => {
      this.loading = false;
      this.deparments = data;
    })
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
          this.provinceService.put(this.id, formValue).subscribe(
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
      this.provinceService.post(formValue).subscribe((res) => {
        this.MessagesService.showConfirmPost();
        this.cancel();
      }, (err) => {
        console.log("ERROR", err)
        this.MessagesService.showMsjError(err.error.message);
        this.cancel();
      });
    }
  }



  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }
}
