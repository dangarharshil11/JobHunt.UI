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
  file?: File;


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
      resumeUrl: '',
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
      if(this.file){
        this.jobuserService.uploadImage(this.file, this.model.id).subscribe({
          next: (response) => {
            if(response.isSuccess){
              this.model.resumeUrl = response.result;
              this.addProfileSubscription$ = this.jobuserService.addProfile(this.model).subscribe({
                next: (response) =>{
                  this.router.navigateByUrl(`/user/${response.result.email}`);
                },
                error: (error) => {
                  console.error(error);
                }
              });
            }
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
      else{
        this.error = "Upload Resume";
      }
    }
  }

  ngOnDestroy(): void {
    this.addProfileSubscription$?.unsubscribe();
  }
  onFileUploadChange(event: Event) : void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
}
