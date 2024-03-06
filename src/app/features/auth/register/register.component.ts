import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  error: string = '';

  constructor(private authService: AuthService,private route: Router, private messageService: MessageService){
    this.model = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      role: '',
      password: '',
    };
  }

  onFormSubmit(): void{
    this.error = '';
    
    if(this.model.email.trim() == '' || this.model.firstName.trim() == '' || this.model.password.trim() == '' || this.model.role.trim() == ''){
      this.error = ('Please Enter all the Details');
    }
    else{
      this.authService.register(this.model).subscribe({
        next: (response) => {  
          this.route.navigateByUrl('/login');
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration Successful!' });
  }
}
