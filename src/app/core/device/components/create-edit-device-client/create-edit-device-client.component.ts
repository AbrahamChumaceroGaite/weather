import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { ClientDeviceService } from '../../services/clientdevice.service';
import { Client } from 'src/app/models/client';
import { DeviceClient } from 'src/app/models/device';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-edit-device-client',
  templateUrl: './create-edit-device-client.component.html',
  styleUrls: ['./create-edit-device-client.component.scss']
})
export class CreateEditDeviceClientComponent {
  @Input() id!: number;
  idDeviceClient!: number;
  clients: Client[] = [];
  form!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  showPassword = false;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = true;
  visible = true;

  constructor(
    private AuthService: AuthService,
    private ShareDataService: ShareDataService,
    private ClientDeviceService: ClientDeviceService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditDeviceClientComponent>
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.checkForm();
  }


  loadForm() {
    const idautor = this.AuthService.getIdUser();
    this.form = this.fb.group({
      idclient: ['', Validators.required],
      idevice: [this.id],
      idautor: parseInt(idautor)
    });

    this.ShareDataService.getClientList().subscribe((data: Client[]) => {
      this.clients = data;
      this.loading = false;
    });
  }

  checkForm() {
    if (this.id) {
      this.ClientDeviceService.getById(this.id).subscribe((data: DeviceClient[]) => {
        console.log(data)
        for (let i of data) {
          this.idDeviceClient = i.id;
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.submitButtonText = 'Actualizar';
          this.formTitle = `Editar: ` + i.client;
          this.form.controls['idclient'].setValue(i.idclient);
          this.form.controls['idevice'].setValue(this.id);
        }
      }, (err) => {
        this.MessagesService.showMsjError(err.error.message);
        this.formHeader = 'create-header';
        this.formlogo = 'plus-circle';
        this.formTitle = 'Nueva Persona';
        this.submitButtonText = 'Crear';
      });

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
    if (this.idDeviceClient) {  
      this.confirmService.editDialog(this.formTitle).then((result) => {
        if (result === 'Confirmed') {
          this.ClientDeviceService.put(this.idDeviceClient, formValue).subscribe(
            () => {
              this.MessagesService.showConfirmEdit();
              this.cancel();
              this.loading = false;
            },
            (err) => {
              console.log(err)
              this.MessagesService.showMsjError(err.error.message);
              this.loading = false;

            }
          );
        }
      });
    } else {
      this.ClientDeviceService.post(formValue).subscribe((res) => {
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
