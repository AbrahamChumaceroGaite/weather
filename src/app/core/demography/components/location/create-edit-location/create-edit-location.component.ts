import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { LocationService } from 'src/app/core/demography/services/location.service';
import { CommunityService } from 'src/app/core/demography/services/community.service';
import { Community, Location } from 'src/app/models/demography';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';

@Component({
  selector: 'app-create-edit-location',
  templateUrl: './create-edit-location.component.html',
  styleUrls: ['./create-edit-location.component.scss']
})
export class CreateEditLocationComponent {
  @Input() id!: number;
  communities: Community [] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;
  constructor(
    private locationService: LocationService,
    private communityService: CommunityService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditLocationComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      idcommunity: ['', Validators.required],
      name: ['', Validators.required],
    });
    if (this.id) {
      this.locationService.getById(this.id).subscribe((data: Location[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['idcommunity'].setValue(i.idcommunity);
          this.form.controls['name'].setValue(i.name);
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nueva Locacion';
      this.submitButtonText = 'Crear';
    };
    this.getCommunity();
  }

  getCommunity() {
    this.communityService.getList().subscribe((data:Community[])=>{
      this.communities = data;
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
          this.locationService.put(this.id, formValue).subscribe(
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
      this.locationService.post(formValue).subscribe((res)=>{
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
