import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/user/services/user.service';
import { ShareDataService } from 'src/app/services/shared/shared.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { Person } from 'src/app/models/person';
import { Rol } from 'src/app/models/rol';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  @Input() id!: number;
  users: Person[] = [];
  rols: Rol[] = [];
  form!: FormGroup;
  Rolform!: FormGroup;
  formTitle!: string;
  formlogo!: string;
  formHeader!: string;
  showPassword = false;
  submitButtonText!: string;
  isFormSubmitted: boolean = false;
  loading = false;
  visible = true;
  message : string = '';

  constructor(
    private ShareDataService: ShareDataService,
    private userService: UserService,    
    private AuthService: AuthService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditUserComponent>
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.checkForm();
  }

  loadForm() {
    const idautor = this.AuthService.getIdUser();
    this.form = this.fb.group({
      idperson: ['', Validators.required],
      idautor: parseInt(idautor)
    });

    this.Rolform = this.fb.group({
      idrol: ['', Validators.required],
      pass: ['', Validators.required],
      idautor: parseInt(idautor)
    });

    this.ShareDataService.getPersonList().subscribe((data: Person[]) => {
      this.users = data;
      this.loading = false;
    });
    this.ShareDataService.getRolList().subscribe((data: Rol[]) => {
      this.rols = data;
      this.loading = false;
    });
  }

  checkForm() {
    if (this.id) {
      this.userService.getById(this.id).subscribe((data: User[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.user;
          this.form.controls['idperson'].setValue(i.idperson);
          this.Rolform.controls['idrol'].setValue(i.idrol);
        }
        this.form.updateValueAndValidity();
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'person-add';
      this.formTitle = 'Nuevo Usuario';
      this.submitButtonText = 'Si';
    };
  }


  submitForm() {
    if (this.form.valid && this.Rolform.valid) {
      this.loading = true;
      const formValue = this.form.value;
      this.saveForm(formValue);
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveForm(formValue: any) {
    const idautor = this.AuthService.getIdUser();
   try{
      const body = {
        idperson: this.form.value.idperson,
        idrol: this.Rolform.value.idrol,
        pass: this.Rolform.value.pass,
        idautor: parseInt(idautor)
      };

      if(this.id) {
        this.userService.put(this.id, body).subscribe((data) => {
          this.loading = false;
          this.MessagesService.showConfirmPost();
          this.message = "Registro actualizado con éxito";
        }, (err) => {
          this.loading = false;
          this.MessagesService.showMsjError(err.error.message);
          this.message = err.error.message;
        })
      } else {
        this.userService.post(body).subscribe((data) => {
          this.loading = false;
          this.MessagesService.showConfirmPost();
          this.message = "Registro guardado con éxito";
        }, (err) => {
          this.loading = false;
          this.MessagesService.showMsjError(err.error.message);
          this.message = err.error.message;
        })
      }

      
      
   } catch (error) {
    this.loading = false;
  
   }
  }


  isInvalid(fieldName: string) {
    const control = this.form.get(fieldName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  isInvalidR(fieldName: string) {
    const control = this.Rolform.get(fieldName);
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

