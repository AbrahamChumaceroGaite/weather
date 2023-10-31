import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ClientDeviceService } from 'src/app/core/device/services/clientdevice.service';
import { Client } from 'src/app/models/client';
import { ClientDevice } from 'src/app/models/clientdevice';
import { ClientService } from 'src/app/core/user/services/client.service';
import { DeviceID } from 'src/app/models/device';
import { DeviceService } from 'src/app/core/device/services/device.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';

@Component({
  selector: 'app-create-edit-client-device',
  templateUrl: './create-edit-client-device.component.html',
  styleUrls: ['./create-edit-client-device.component.scss']
})
export class CreateEditClientDeviceComponent {
  @Input() id!: number;
  devices: DeviceID [] = [];
  clients: Client [] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;
  constructor(
    private deviceService: DeviceService,
    private clientService: ClientService,
    private clientDeviceService: ClientDeviceService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditClientDeviceComponent>
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      idclient: ['', Validators.required],
      idevice: ['', Validators.required],
    });
    if (this.id) {
      this.clientDeviceService.getById(this.id).subscribe((data: ClientDevice[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar Estacion`;
          this.form.controls['idclient'].setValue(i.idclient);
          this.form.controls['idevice'].setValue(i.idevice);
        }
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'plus-circle';
      this.formTitle = 'Asignar Estacion';
      this.submitButtonText = 'Crear';
    };
    this.getData();
  }


  getData(){
    this.clientService.get().subscribe((data:Client[])=>{
      this.clients = data;
    });
    this.deviceService.getIdentityList().subscribe((data:DeviceID[])=>{
      this.devices = data;
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
          this.clientDeviceService.put(this.id, formValue).subscribe(
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
      this.clientDeviceService.post(formValue).subscribe((res)=>{
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
