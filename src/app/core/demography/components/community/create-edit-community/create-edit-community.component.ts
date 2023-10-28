import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { MunicipalityService } from 'src/app/core/demography/services/municipality.service';
import { CommunityService } from 'src/app/core/demography/services/community.service';
import { Municipality, Community } from 'src/app/models/demography';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';

@Component({
  selector: 'app-create-edit-community',
  templateUrl: './create-edit-community.component.html',
  styleUrls: ['./create-edit-community.component.scss']
})
export class CreateEditCommunityComponent {
  @Input() id!: number;
  municipies: Municipality [] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;
  constructor(
    private municipalityService: MunicipalityService,
    private communityService: CommunityService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditCommunityComponent>
  ) { }

ngOnInit(): void {
    this.form = this.fb.group({
      idmunicipality: ['', Validators.required],
      name: ['', Validators.required],
    });
    if (this.id) {
      this.communityService.getById(this.id).subscribe((data: Community[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['idmunicipality'].setValue(i.idmunicipality);
          this.form.controls['name'].setValue(i.name);
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nueva Comunidad';
      this.submitButtonText = 'Crear';
    };
    this.getMunicipality();
  }

  getMunicipality() {
    this.municipalityService.get().subscribe((data:Municipality[])=>{
      this.municipies = data;
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
          this.communityService.put(this.id, formValue).subscribe(
            () => {
              this.MessagesService.showConfirmEdit();
              this.cancel();
              this.loading = false;
            },
            (error) => {
              this.MessagesService.showError();
              this.loading = false;
              console.log(error);
            }
          );
        } 
      });
    } else {
      this.communityService.post(formValue).subscribe((res)=>{
        this.MessagesService.showConfirmPost();
        this.cancel();
      }, (err)=>{
        console.log("ERROR",err)
        this.MessagesService.showError();
        this.cancel();
      });
    }
  }
  
  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }
}
