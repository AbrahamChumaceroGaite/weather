import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private MessagesService: MessagesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadform();
  }

  loadform() {
    this.form = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(3)]],
      pass: ['', Validators.required],
    })
  }

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe(
      (res: any) => {      
        this.MessagesService.showSuccessLogin();
        this.router.navigate(['/home/admin/device']);
      },
      (err: any) => {
        this.MessagesService.showFailedLogin();
      }
    );
  }
}
