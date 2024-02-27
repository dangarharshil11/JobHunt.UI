import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Vacancy } from '../models/vacancy.model';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnDestroy {
  model: Vacancy;
  error: string = '';
  organization: string | null = null;

  addVacancySubscription?: Subscription;

  constructor(private employerService: EmployerService, private router: Router){
    this.organization = localStorage.getItem('organization');
    this.model = {
      publishedBy: '',
      publishedDate: new Date(),
      noOfVacancies: 0,
      minimumQualification: '',
      jobTitle: '',
      jobDescription: '',
      experienceRequired: '',
      lastDate: new Date(),
      minimumSalary: 0,
      maximumSalary: 0,
    }
  }

  onFormSubmit(){
    if(this.organization){
      this.model.publishedBy = this.organization

      this.addVacancySubscription = this.employerService.createVacancy(this.model).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/vacancy');
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.addVacancySubscription?.unsubscribe();
  }
}
