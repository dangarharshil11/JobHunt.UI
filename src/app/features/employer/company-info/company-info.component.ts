import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Organization } from '../models/organization.model';
import { EmployerService } from '../services/employer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent {
  profile: Organization;
  email?: string | null = null;
  profile$?: Observable<Organization>;

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
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.email = params.get('email');     
      }
    });
    if(this.email){ 
      this.profile.createdBy = this.email;   
      this.profile$ = this.employerService.getprofile(this.email);
    }
  }

  onFormSubmit(){

  }
}
