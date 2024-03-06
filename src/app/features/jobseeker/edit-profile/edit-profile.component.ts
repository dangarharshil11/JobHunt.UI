import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { JobuserService } from '../services/jobuser.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  model: User;
  email: string | null = null;
  id: string | null = null;
  error: string = '';
  file?: File;

  editProfileSubscription$?: Subscription;

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
    if(this.email){
      this.jobuserService.getProfile(this.email).subscribe({
        next: (response) => {
          this.model = response.result;
        },
        error: (error) => {
          console.error(error);
        }
      });
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
              this.editProfileSubscription$ = this.jobuserService.editProfile(this.model, this.model.email).subscribe({
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
    this.editProfileSubscription$?.unsubscribe();
  }

  onFileUploadChange(event: Event) : void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
}
