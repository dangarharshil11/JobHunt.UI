import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Organization } from '../models/organization.model';
import { EmployerService } from '../services/employer.service';
import { Response } from '../models/response-model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent {
  profile: Organization;
  email?: string | null = null;
  isProfileVisible : boolean = false;

  constructor(private route: ActivatedRoute, private employerService: EmployerService){
    this.profile ={
      organization: '',
      organizationType: '',
      companyEmail: '',
      companyPhone: '',
      noOfEmployees: 0,
      startYear: 0,
      about: '',
      createdBy: '',
      imageUrl: ''
    }
  }

  ngOnInit(): void {
    // Retrieving email from url
    this.route.paramMap.subscribe({
      next: (params) => {
        this.email = params.get('email');     
      }
    });
    if(this.email){ 
      this.profile.createdBy = this.email;   
      // Retrieve Organization Profile based on email
      this.employerService.getprofile(this.email).subscribe({
        next: (response) => {
          if(response.result){
            this.profile = response.result;
            this.isProfileVisible = true;
          }
        }
      });
    }
  }
}
