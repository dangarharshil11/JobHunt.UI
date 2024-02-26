import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest

  constructor(private authService: AuthService, private cookieService: CookieService, private route: Router){
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void{
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
        this.route.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
