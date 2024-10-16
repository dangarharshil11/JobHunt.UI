import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Response } from '../models/response-model';
import { ToasterService } from 'src/app/shared/services/toaster.service';

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
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(7)]
  })

  constructor(private ngZone: NgZone, private authService: AuthService, private cookieService: CookieService, private route: Router, private fb: FormBuilder, private toasterService: ToasterService) {
   var revenue = 50;
  	window.VWO = window.VWO || [];
  	VWO.event = VWO.event || function () {VWO.push(['event'].concat([].slice.call(arguments)))};
  	VWO.event('purchase', {
  		'checkout':true,
  		'revenue':revenue
  	})
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
            this.toasterService.showError(response.message);
          }
        }
      });
    });
  }
}
