import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Response } from '../models/response-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest = {
    email: '',
    password: ''
  };
  response$?: Observable<Response>

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private ngZone: NgZone, private authService: AuthService, private cookieService: CookieService, private route: Router, private fb: FormBuilder, private messageService: MessageService) {
  }

  onFormSubmit(): void {
    this.model = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    };

    this.response$ = this.authService.login(this.model)

    this.ngZone.run(() => {
      this.response$?.subscribe({
        next: (response) => {
          if (response.isSuccess) {

            this.cookieService.set('Authorization', `Bearer ${response.result?.token}`, undefined, '/', undefined, true, 'Strict');

            if (response.result) {
              this.authService.setUser({
                userId: response.result.userId,
                fullName: response.result.fullName,
                email: response.result.email,
                roles: response.result.roles,
              });
            }
            this.route.navigateByUrl('/');
          }
          else {
            this.showerror(response.message);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

  showerror(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
