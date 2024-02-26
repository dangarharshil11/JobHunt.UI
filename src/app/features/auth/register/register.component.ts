import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterRequest } from '../models/register-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterRequest;

  constructor(private authService: AuthService,private route: Router){
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
