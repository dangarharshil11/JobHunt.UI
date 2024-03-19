import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '../models/user.model';
import { JobuserService } from '../services/jobuser.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit, OnDestroy {
  model: User;
  email: string | null = null;
  id: string | null = null;
  file?: File;
  resumeFlag: boolean = false;
  dateFlag: boolean = false;

  addProfileSubscription$?: Subscription;

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
    }
  }

  addProfileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: new FormControl('', [Validators.minLength(10), Validators.required]),
    address: ['', Validators.required],
    expectedSalary: [0, Validators.required],
    totalExperience: [0, Validators.required],
  });

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    this.id = localStorage.getItem('user-id');
    if (this.email && this.id) {
      this.model.email = this.email;
      this.model.id = this.id;
    }
  }

  onFormSubmit() {
    this.model = {
      id: this.model.id,
      firstName: this.addProfileForm.get('firstName')?.value || '',
      lastName: this.addProfileForm.get('lastName')?.value || '',
      phone: this.addProfileForm.get('phone')?.value || '',
      address: this.addProfileForm.get('address')?.value || '',
      email: this.model.email,
      expectedSalary: this.addProfileForm.get('expectedSalary')?.value || 0,
      totalExperience: this.addProfileForm.get('totalExperience')?.value || 0,
      dateOfBirth: this.model.dateOfBirth,
      resumeUrl: this.model.resumeUrl,
    }

    if (!this.file) {
      this.resumeFlag = true;
    }
    else if(this.model.dateOfBirth.getTime() == new Date().getTime()){
      this.dateFlag = true;
    }
    else {
      this.jobuserService.uploadImage(this.file, this.model.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.model.resumeUrl = response.result;
            this.addProfileSubscription$ = this.jobuserService.addProfile(this.model).subscribe({
              next: (response) => {
                this.show();
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
  }

  ngOnDestroy(): void {
    this.addProfileSubscription$?.unsubscribe();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile Added Successfully!' });
  }


}
