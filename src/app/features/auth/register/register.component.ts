import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { RegisterRequest } from '../models/register-request.model';
import { AuthService } from '../services/auth.service';
import { Response } from '../models/response-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterRequest;
  response$?: Observable<Response>;
  roles = ['JobSeeker', 'Employer']

  constructor(private ngZone: NgZone, private authService: AuthService, private route: Router, private messageService: MessageService, private fb: FormBuilder) {
    this.model = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      role: '',
      password: '',
    };
  }

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.required]),
    email: ['', Validators.required],
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    selectedRole: ['', Validators.required]
  })

  onFormSubmit(): void {
    this.model = {
      firstName: this.registerForm.get('firstName')?.value || '',
      lastName: this.registerForm.get('lastName')?.value || '',
      phoneNumber: this.registerForm.get('phoneNumber')?.value || '',
      email: this.registerForm.get('email')?.value || '',
      role: this.registerForm.get('selectedRole')?.value || '',
      password: this.registerForm.get('password')?.value || '',
    };

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    }
    else {
      this.ngZone.run(() => {
      this.authService.register(this.model).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.show();
            this.route.navigateByUrl('/auth/login');
          }
          else {
            this.showError(response.message);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
    }
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration Successful!' });
  }

  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
