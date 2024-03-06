import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { EmployerService } from '../../employer/services/employer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest;
  error: string = '';

  constructor(private messageService: MessageService, private authService: AuthService, private cookieService: CookieService, private route: Router, private employerService: EmployerService){
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void{
    this.error = ''
    if(this.model.email.trim() == '' ||  this.model.password.trim() == ''){
      this.error = ('Please Enter all the Details');
    }
    else{
      this.authService.login(this.model).subscribe({
        next: (response) => {
          this.cookieService.set('Authorization', `Bearer ${response.result?.token}`, undefined, '/', undefined, true, 'Strict');
          
          if(response.result){
            this.authService.setUser({
              userId: response.result.userId,
              fullName: response.result.fullName,
              email: response.result.email,
              roles: response.result.roles,
            }); 
          }
          this.show();
          this.route.navigateByUrl('/');
        },
        error: (error) => {
          console.error(error);
        }
      });
    } 
  }

  show() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful!' });
  }
}
