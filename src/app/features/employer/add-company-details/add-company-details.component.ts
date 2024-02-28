import { Component, OnDestroy } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Organization } from '../models/organization.model';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-add-company-details',
  templateUrl: './add-company-details.component.html',
  styleUrls: ['./add-company-details.component.css']
})
export class AddCompanyDetailsComponent implements OnDestroy{
  profile: Organization;
  email?: string | null = null;
  error: string = '';

  addProfileSubscription?: Subscription;

  constructor(private router: Router, private employerService: EmployerService){
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

  onFormSubmit(){
    this.email = localStorage.getItem('user-email');
    if(this.email){ 
      this.profile.createdBy = this.email;
      if(this.profile.organization != '' || this.profile.organizationType != '' || this.profile.about != '' || 
        this.profile.startYear || this.profile.companyEmail || this.profile.companyPhone || this.profile.noOfEmployees){
          this.addProfileSubscription = this.employerService.createProfile(this.profile).subscribe({
            next: (response) => {
              this.router.navigateByUrl(`/organization/${this.email}`);
            },
            error: (error) => {
              console.error(error);
            }
        });
      }
      else{
        this.error = ('Please Enter all the Details');
      }
    }
  }

  ngOnDestroy(): void {
    this.addProfileSubscription?.unsubscribe();
  }
}
