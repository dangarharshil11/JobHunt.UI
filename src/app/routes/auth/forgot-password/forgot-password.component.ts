import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

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

  constructor(private ngZone: NgZone, private authService: AuthService, private router: Router, private toasterService: ToasterService, private fb: FormBuilder){
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
              this.toasterService.showSuccess('Password Reset Successful!')
              this.router.navigateByUrl("/auth/login");
            }
            else{
              this.toasterService.showError(response.message)
              this.error = response.message;
            }
          }
        });
      });
    }
  }
}
