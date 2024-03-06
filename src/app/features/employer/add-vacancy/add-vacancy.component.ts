import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

import { VacancyRequest } from '../models/vacancy-request.model';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnDestroy {
  model: VacancyRequest;
  error: string = '';
  email: string | null = null;

  addVacancySubscription?: Subscription;

  constructor(private employerService: EmployerService, private router: Router, private messageService: MessageService){
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
    this.email = localStorage.getItem('user-email');
    if(this.model.experienceRequired == '' || this.model.jobTitle =='' || this.model.noOfVacancies == 0 || this.model.maximumSalary == 0 || 
    this.model.minimumSalary == 0 || this.model.minimumQualification == '' || this.model.experienceRequired == '' || this.model.jobDescription ==''){
      this.error = 'Enter all the Details'
    }
    else{
      if(this.email){ 
        this.model.publishedBy = this.email;
        this.addVacancySubscription = this.employerService.createVacancy(this.model).subscribe({
          next: (response) => {
            this.show();
            this.router.navigateByUrl('/vacancy');
          },
          error: (error) => {
            console.error(error);
          }
        });
      } 
    }
}

  ngOnDestroy(): void {
    this.addVacancySubscription?.unsubscribe();
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vacancy Added Successfully!' });
  }
}
