import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Organization } from '../models/organization.model';
import { EmployerService } from '../services/employer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-company-details',
  templateUrl: './add-company-details.component.html',
  styleUrls: ['./add-company-details.component.css']
})
export class AddCompanyDetailsComponent implements OnDestroy{
  profile: Organization;
  email?: string | null = null;

  addProfileSubscription?: Subscription;

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

  onFormSubmit(){
    this.email = localStorage.getItem('user-email');
    if(this.email){ 
      this.profile.createdBy = this.email;
      if(this.profile.organization != '' || this.profile.organizationType != '' || this.profile.about != ''){
          this.addProfileSubscription = this.employerService.createProfile(this.profile).subscribe({
            next: (response) => {
              this.router.navigateByUrl(`/organization/${this.email}`);
            },
            error: (error) => {
              console.error(error);
            }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.addProfileSubscription?.unsubscribe();
  }
}
