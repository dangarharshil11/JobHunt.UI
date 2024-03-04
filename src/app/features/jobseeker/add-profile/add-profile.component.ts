import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../models/user.model';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit, OnDestroy {
  model: User;
  email: string | null = null;
  id: string | null = null;
  error: string = '';

  addProfileSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router){
    this.model = {
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      email: '',
      expectedSalary: 0,
      totalExperience: 0,
      dateOfBirth: new Date(),
    }
  }
 
  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    this.id = localStorage.getItem('user-id');
    if(this.email && this.id){
      this.model.email = this.email;
      this.model.id = this.id;
    }
  }

  onFormSubmit(){
    if(this.model.firstName == '' || this.model.lastName == '' || this.model.phone == '' || this.model.address == '' ||
      this.model.expectedSalary == 0 || this.model.totalExperience == 0){
        this.error = 'Enter All the details'
    }
    else{
      this.addProfileSubscription$ = this.jobuserService.addProfile(this.model).subscribe({
        next: (response) =>{
          this.router.navigateByUrl(`/user/${response.email}`);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.addProfileSubscription$?.unsubscribe();
  }
}
