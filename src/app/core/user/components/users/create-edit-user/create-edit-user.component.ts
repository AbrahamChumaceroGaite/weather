import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/user/services/user.service';
import { RolerService } from 'src/app/core/user/services/roler.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { Roles } from 'src/app/models/rol';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  @Input() id!: number;
  rols: Roles[] = [];
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
    private userService: UserService,
    private rolService: RolerService,
    private confirmService: ConfirmService,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateEditUserComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      idrol: ['', Validators.required],
      pass: ['']
    });
    
    if (this.id) {
      this.userService.getById(this.id).subscribe((data: User[]) => {
        for (let i of data) {
          this.formHeader = 'edit-header';
          this.formlogo = 'edit';
          this.formTitle = `Editar: ` + i.name;
          this.form.controls['name'].setValue(i.name);
          this.form.controls['email'].setValue(i.email);
          this.form.controls['idrol'].setValue(i.idrol);
        }
        this.form.updateValueAndValidity();
      });
      this.submitButtonText = 'Actualizar';
    } else {
      this.formHeader = 'create-header';
      this.formlogo = 'person-add';
      this.formTitle = 'Nuevo Usuario';
      this.submitButtonText = 'Crear';
      this.form.get('pass')?.setValidators([Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]);
    };
    this.getRols();
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
          this.userService.put(this.id, formValue).subscribe(
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
      this.userService.post(formValue).subscribe((res)=>{
        this.MessagesService.showConfirmPost();
        this.cancel();
      }, (err)=>{
        console.log("ERROR",err)
        this.MessagesService.showError();
        this.cancel();
      });
    }
  }

  getRols() {
    this.rolService.get().subscribe((data: Roles[]) => {
      // Filtrar los roles deseados (Administrador, Operador e Institucional)
      this.rols = data.filter((rol) => ['Administrador', 'Operador', 'Institucional'].includes(rol.rol));
    }, (err) => {
      console.log("Error: ", err);
    });
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

