import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private authService: AuthService, private cookieService: CookieService, private route: Router, private employerService: EmployerService){
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
          this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
  
          this.authService.setUser({
            userId: response.userId,
            fullName: response.fullName,
            email: response.email,
            roles: response.roles,
          }); 
          this.route.navigateByUrl('/');
        },
        error: (error) => {
          console.error(error);
        }
      });
    } 
  }
}
