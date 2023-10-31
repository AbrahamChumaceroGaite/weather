import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/core/user/services/client.service';
import { RolerService } from 'src/app/core/user/services/roler.service';
import { Location } from 'src/app/models/demography';
import { LocationService } from 'src/app/core/demography/services/location.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { Roles } from 'src/app/models/rol';

@Component({
  selector: 'app-create-edit-client',
  templateUrl: './create-edit-client.component.html',
  styleUrls: ['./create-edit-client.component.scss']
})
export class CreateEditClientComponent implements OnInit {
  @Input() id!: number;
  locations: Location[] = [];
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
    private rolService: RolerService,
    private locationService: LocationService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditClientComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      ci: ['', Validators.required],
      idrol: ['', Validators.required],
      idlocation: ['', Validators.required],
      number: ['', [Validators.required, Validators.maxLength(8)]],
      pass: ['' ]
    });
    if (this.id) {
      this.clientService.getById(this.id).subscribe((data: Client[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['name'].setValue(i.name);
          this.form.controls['ci'].setValue(i.ci);
          this.form.controls['idlocation'].setValue(i.idlocation);
          this.form.controls['number'].setValue(i.number);
        }
        this.form.markAllAsTouched();
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'person-add';
      this.formTitle = 'Nuevo Cliente';
      this.submitButtonText = 'Crear';
      this.form.get('pass')?.setValidators([Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]);
    };
    this.getRols();
    this.getLocations();
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
      this.clientService.post(formValue).subscribe((res)=>{
        this.MessagesService.showConfirmPost();
        this.cancel();
      }, (err) => {
              this.MessagesService.showMsjError(err.error.message);
        this.cancel();
      });
    }
  }

  getRols(){
    this.rolService.get().subscribe((data: Roles[])=>{
      this.form.get('idrol')?.setValue(data[2]?.id);
      console.log(data[2]?.rol)
    }, (err)=>{
      console.log("Error: ", err)
    })
  }

  getLocations(){
    this.locationService.getList().subscribe((data: Location[])=>{
      this.locations = data
    })
  }

  validatePhoneNumberLength() {
    const phoneNumber = this.form.get('number')?.value;
    if (phoneNumber && phoneNumber.toString().length > 8) {
      this.form.get('number')?.setValue(phoneNumber.toString().slice(0, 8));
    }
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  
  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }

}
