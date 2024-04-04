import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  error: string ='';
  model: LoginRequest;

  forgotPasswordForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private ngZone: NgZone, private authService: AuthService, private router: Router, private messageService: MessageService, private fb: FormBuilder){
    this.model = {
      email: '',
      password: '',
    }
  }

  onSubmit(){
    this.model = {
      email: this.forgotPasswordForm.get('email')?.value || '',
      password: this.forgotPasswordForm.get('password')?.value || '',
    };

    if(this.forgotPasswordForm.valid){
      this.ngZone.run(() => {
        this.authService.forgotpassword(this.model).subscribe({
          next: (response) => {
            if(response.isSuccess){
              this.show();
              this.router.navigateByUrl("/auth/login");
            }
            else{
              this.showerror();
              this.error = response.message;
            }
          }
        });
      });
    }
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Reset Successful!' });
  }
  
  showerror(){
    this.messageService.add({ severity: 'error', summary: 'Invalid Email', detail: 'User do not Exist Please Register!' });
  }
}
