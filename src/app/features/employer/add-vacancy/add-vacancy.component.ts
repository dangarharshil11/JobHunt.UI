import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

import { VacancyRequest } from '../models/vacancy-request.model';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnDestroy, OnInit {
  model: VacancyRequest;
  email: string | null = null;

  addVacancySubscription?: Subscription;

  constructor(private employerService: EmployerService, private router: Router, private messageService: MessageService, private fb: FormBuilder) {
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

  addVacancyForm = this.fb.group({
    noOfVacancies: [0, Validators.min(1)],
    minimumQualification: ['', Validators.required],
    jobTitle: ['', Validators.required],
    jobDescription: ['', Validators.minLength(50)],
    experienceRequired: ['', Validators.required],
    minimumSalary: [0, Validators.min(1)],
    maximumSalary: [0, Validators.min(1)],
    lastDate: [new Date(), Validators.required]
  });

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    if (this.email) {
      this.model.publishedBy = this.email;
    }
  }

  onFormSubmit() {
    this.model = {
      jobTitle: this.addVacancyForm.get('jobTitle')?.value || '',
      noOfVacancies: this.addVacancyForm.get('noOfVacancies')?.value || 0,
      minimumQualification: this.addVacancyForm.get('minimumQualification')?.value || '',
      jobDescription: this.addVacancyForm.get('jobDescription')?.value || '',
      experienceRequired: this.addVacancyForm.get('experienceRequired')?.value || '',
      minimumSalary: this.addVacancyForm.get('minimumSalary')?.value || 1,
      maximumSalary: this.addVacancyForm.get('maximumSalary')?.value || 1,
      publishedBy: this.model.publishedBy,
      lastDate: this.addVacancyForm.get('lastDate')?.value || new Date(Date.now()+(15*24*60*60*1000)),
      publishedDate: this.model.publishedDate,
    }

    this.addVacancySubscription = this.employerService.createVacancy(this.model).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.show();
          this.router.navigateByUrl('/vacancy');
        }
        else{
          this.showError(response.message);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.addVacancySubscription?.unsubscribe();
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vacancy Added Successfully!' });
  }

  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
