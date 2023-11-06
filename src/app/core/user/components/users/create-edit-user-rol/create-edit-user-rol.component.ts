import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { ShareDataService} from 'src/app/services/shared/shared.service';
import { UserService } from '../../../services/user.service';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-edit-user-rol',
  templateUrl: './create-edit-user-rol.component.html',
  styleUrls: ['./create-edit-user-rol.component.scss']
})
export class CreateEditUserRolComponent implements OnInit  {
  @Input() id!: number;
  rols: Rol[] = [];
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
    private userService: UserService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditUserRolComponent>
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.checkForm();
  }

  loadForm() {
    const idautor = this.AuthService.getIdUser(); 
    this.form = this.fb.group({
      iduser: [this.id],
      idrol: ['', Validators.required],      
      pass: [''],
      idautor: parseInt(idautor)
    });

    this.ShareDataService.getRolList().subscribe((data: Rol[]) => {
      this.rols = data;
      this.loading = false;
    });
   }

  checkForm() {
    if (this.id) {
      this.userService.getById(this.id).subscribe((data: User[]) => {
        console.log(data)
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.user;
          this.form.controls['idrol'].setValue(i.idrol);
        }
      });
      this.submitButtonText = 'Actualizar';
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
    if (this.id) {
      this.confirmService.editDialog(this.formTitle).then((result) => {
        if (result === 'Confirmed') {
          this.userService.putRol(this.id, formValue).subscribe(
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
    } 
  }

  isInvalid(fieldName: string) {
    const control = this.form.get(fieldName);
    return control && control.invalid && (control.dirty || control.touched);
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
