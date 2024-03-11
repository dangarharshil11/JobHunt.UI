import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { RegisterRequest } from '../models/register-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterRequest;
  roles = ['JobSeeker', 'Employer']

  constructor(private authService: AuthService,private route: Router, private messageService: MessageService, private fb: FormBuilder){
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
    phoneNumber: ['', Validators.minLength(10)],
    email: ['', Validators.required],
    password: ['', Validators.minLength(6)],
    selectedRole: ['', Validators.required]
  })

  onFormSubmit(): void{ 
    this.model = {
      firstName: this.registerForm.get('firstName')?.value || '',
      lastName: this.registerForm.get('lastName')?.value || '',
      phoneNumber: this.registerForm.get('phoneNumber')?.value || '',
      email: this.registerForm.get('email')?.value || '',
      role: this.registerForm.get('selectedRole')?.value || '',
      password: this.registerForm.get('password')?.value || '',
    };
    
    this.authService.register(this.model).subscribe({
      next: (response) => { 
        if(response.isSuccess){
          this.show();
          this.route.navigateByUrl('/auth/login');
        }
        else{
          this.showError(response.message);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration Successful!' });
  }

  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
