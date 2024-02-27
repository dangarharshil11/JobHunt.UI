import { Component, OnDestroy, OnInit } from '@angular/core';

import { Organization } from '../models/organization.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from '../services/employer.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private employerService: EmployerService){
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
          this.profile = response;
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
          this.router.navigateByUrl(`/organization/${response.createdBy}`)
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
}
