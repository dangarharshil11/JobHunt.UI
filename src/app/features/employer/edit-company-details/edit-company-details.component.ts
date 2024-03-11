import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Organization } from '../models/organization.model';
import { EmployerService } from '../services/employer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.css']
})
export class EditCompanyDetailsComponent implements OnInit, OnDestroy {
  profile: Organization;
  email?: string | null = null;
  error: string = '';

  editProfileSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private employerService: EmployerService, private messageService: MessageService){
    this.profile ={
      organization: '',
      organizationType: '',
      companyEmail: '',
      companyPhone: '',
      noOfEmployees: 0,
      startYear: 0,
      about: '',
      createdBy: '',
    }
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    if(this.email){
      this.employerService.getprofile(this.email).subscribe({
        next: (response) => {
          this.profile = response.result;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onFormSubmit(){
    if(this.profile.organization.trim() == '' || this.profile.organizationType.trim() == '' || this.profile.about.trim() == '' || 
      this.profile.startYear == 0 || this.profile.companyEmail.trim() == '' || this.profile.companyPhone.trim() == '' || 
      this.profile.noOfEmployees == 0){
        this.error = 'Please Enter all the Details';
    }
    else{
      this.editProfileSubscription = this.employerService.updateProfile(this.profile).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.show();
            this.router.navigateByUrl(`/profile/${response.result.createdBy}`)
          }
          else{
            this.error = response.message;
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.editProfileSubscription?.unsubscribe();
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Organization Information Updated Successfully!' });
  }
}
