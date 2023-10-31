import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { MunicipalityService } from 'src/app/core/demography/services/municipality.service';
import { ProvinceService } from 'src/app/core/demography/services/province.service';
import { Province, Municipality } from 'src/app/models/demography';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-create-edit-municipality',
  templateUrl: './create-edit-municipality.component.html',
  styleUrls: ['./create-edit-municipality.component.scss']
})
export class CreateEditMunicipalityComponent {
  @Input() id!: number;
  provinces: Province[] = [];

  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = true;
  visible = true;
  dataSelected: any;

  constructor(
    private ShareDataService: ShareDataService,
    private municipalityService: MunicipalityService,
    private provinceService: ProvinceService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditMunicipalityComponent>
  ) {
    this.ShareDataService.selectedValue$.subscribe((value) => {
      this.dataSelected = value;
    });
  }

  ngOnInit(): void {
    console.log("EDIT: ", this.id)
    this.form = this.fb.group({
      idprovince: ['', Validators.required],
      name: ['', Validators.required],
    });
    if (this.id) {
      this.municipalityService.getById(this.id).subscribe((data: Municipality[]) => {
        for (let i of data) {
          this.loading = false;
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['idprovince'].setValue(i.idprovince);
          this.form.controls['name'].setValue(i.name);
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nuevo Municipio';
      this.submitButtonText = 'Crear';
    };
    this.getProvince();
  }

  getProvince() {
    this.provinceService.getByDept(this.dataSelected).subscribe((data: Province[]) => {
      this.loading = false;
      this.provinces = data;
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
          this.municipalityService.put(this.id, formValue).subscribe(
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
      this.municipalityService.post(formValue).subscribe((res) => {
        this.MessagesService.showConfirmPost();
        this.cancel();
      }, (err) => {
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
