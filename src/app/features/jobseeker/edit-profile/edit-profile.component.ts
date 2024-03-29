import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { JobuserService } from '../services/jobuser.service';
import { User } from '../models/user.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  model: User;
  email: string | null = null;
  id: string | null = null;
  resumeFile?: File;
  imageFile?: File;

  editProfileSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router, private messageService: MessageService, private fb: FormBuilder) {
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
      imageUrl: ''
    }
  }

  editProfileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: new FormControl('', [Validators.minLength(10), Validators.required]),
    address: ['', Validators.required],
    expectedSalary: [0, Validators.required],
    totalExperience: [0, Validators.required],
  });

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    if (this.email) {
      this.jobuserService.getProfile(this.email).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.model = response.result;
            this.editProfileForm.setValue({
              firstName: this.model.firstName,
              lastName: this.model.lastName,
              phone: this.model.phone,
              address: this.model.address,
              expectedSalary: this.model.expectedSalary,
              totalExperience: this.model.totalExperience
            });
          }
          else {
            this.error(response.message);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onFormSubmit() {
    this.model = {
      id: this.model.id,
      firstName: this.editProfileForm.get('firstName')?.value || this.model.firstName,
      lastName: this.editProfileForm.get('lastName')?.value || this.model.lastName,
      phone: this.editProfileForm.get('phone')?.value || this.model.phone,
      address: this.editProfileForm.get('address')?.value || this.model.address,
      email: this.model.email,
      expectedSalary: this.editProfileForm.get('expectedSalary')?.value || this.model.expectedSalary,
      totalExperience: this.editProfileForm.get('totalExperience')?.value || this.model.totalExperience,
      dateOfBirth: this.model.dateOfBirth,
      resumeUrl: this.model.resumeUrl,
      imageUrl: this.model.imageUrl
    }
    this.uploadResume();
  }

  uploadResume(): void{
    if(this.resumeFile){
      this.jobuserService.uploadResume(this.resumeFile, this.model.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.model.resumeUrl = response.result;
            this.uploadImage();
          }
          else {
            this.error(response.message);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    else{
      this.uploadImage();
    }
  }

  uploadImage(): void{
    if (this.imageFile) {
      this.jobuserService.uploadImage(this.imageFile, this.model.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.model.imageUrl = response.result;
            this.updateProfile();
          }
          else {
            this.error(response.message);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    else{
      this.updateProfile();
    }
  }

  updateProfile(): void{
    this.editProfileSubscription$ = this.jobuserService.editProfile(this.model).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.show(response.message);
          this.router.navigateByUrl(`/user/${response.result.email}`);
        }
        else {
          this.error(response.message);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.editProfileSubscription$?.unsubscribe();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.resumeFile = element.files?.[0];
  }

  onImageFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.imageFile = element.files?.[0];
  }

  show(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  error(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
