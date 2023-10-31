import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { DeviceID } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { LocationService } from 'src/app/core/demography/services/location.service';
import { Location } from 'src/app/models/demography';
@Component({
  selector: 'app-create-edit-device',
  templateUrl: './create-edit-device.component.html',
  styleUrls: ['./create-edit-device.component.scss']
})
export class CreateEditDeviceComponent {
 @Input() id!: number;
  toggleValue!: boolean;
  deviceID: DeviceID[] = [];
  locations: Location[] = [];
  randomString!: string;
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  status!: string;
  showPassword = false;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;
  constructor(
    private deviceService: DeviceService,
    private locationService: LocationService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditDeviceComponent>
  ) { }

ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      idlocation: ['', Validators.required],
      status: ['0', Validators.required]
    });
    if (this.id) {
      this.deviceService.getIdentityById(this.id).subscribe((data: DeviceID[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['name'].setValue(i.name);
          this.form.controls['idlocation'].setValue(i.idlocation);
          this.form.controls['status'].setValue(i.status);
          this.status = 'Estado Actual ';
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Nueva Estacion';
      this.status = 'Estado Inicial ';
      this.submitButtonText = 'Crear';
    };
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
          this.deviceService.putIdentity(this.id, formValue).subscribe(
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
      this.deviceService.postIdentity(formValue).subscribe((res)=>{
        this.MessagesService.showConfirmPost();
        this.cancel();
      }, (err)=>{
        console.log("ERROR",err)
        this.MessagesService.showMsjError(err.error.message);
        this.cancel();
      });
    }
  }
  

  getLocations(){
    this.locationService.getList().subscribe((data: Location[])=>{
      this.locations = data
    })
  }

  generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    const length = 8;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.randomString = result;
     this.form.controls['name'].setValue(this.randomString) 
  }

  onToggleChange() {
    this.toggleValue = !this.toggleValue;
    this.form.controls['status'].setValue(this.toggleValue ? '1' : '0');
  }

  cancel() {
    this.dialogRef.close();
    this.visible = false;
  }
}

