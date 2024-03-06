import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService){
    this.model = {
      email: '',
      password: '',
    }
  }

  onSubmit(){
    if(this.model?.email == '' || this.model.password == ''){
      this.error = "Please Enter Email and Password";
    }
    else{
      this.authService.forgotpassword(this.model).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.show();
            this.router.navigateByUrl("/login");
          }
          else{
            this.error = response.message;
          }
        }
      });
    }
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Reset Successful!' });
  }
}
