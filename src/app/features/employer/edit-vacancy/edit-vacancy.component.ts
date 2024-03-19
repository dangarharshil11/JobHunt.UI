import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmployerService } from '../services/employer.service';
import { VacancyRequest } from '../models/vacancy-request.model';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent implements OnInit, OnDestroy {
  model: VacancyRequest;
  email: string | null = null;
  id: string | null = null;
  
  editVacancySubscription?: Subscription;

   constructor(private employerService: EmployerService, private router: Router, private route: ActivatedRoute, private messageService: MessageService, private fb: FormBuilder){
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

  editVacancyForm = this.fb.group({
    noOfVacancies: [0, Validators.min(1)],
    minimumQualification: ['', Validators.required],
    jobTitle: ['', Validators.required],
    jobDescription: new FormControl('', [Validators.minLength(50), Validators.required]),
    experienceRequired: ['', Validators.required],
    minimumSalary: [new FormControl(0, [Validators.min(1), Validators.required])],
    maximumSalary: [new FormControl(0, [Validators.min(1), Validators.required])],
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    if(this.id){
      this.employerService.getVacancyById(this.id).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.model = response.result;
            this.editVacancyForm.setValue({
              noOfVacancies: this.model.noOfVacancies,
              minimumQualification: this.model.minimumQualification,
              jobTitle: this.model.jobTitle,
              jobDescription: this.model.jobDescription,
              experienceRequired: this.model.experienceRequired,
              minimumSalary: this.model.minimumSalary,
              maximumSalary: this.model.maximumSalary
            })
          }
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  onFormSubmit(){
    this.model = {
      jobTitle: this.editVacancyForm.get('jobTitle')?.value || this.model.jobTitle,
      noOfVacancies: this.editVacancyForm.get('noOfVacancies')?.value || this.model.noOfVacancies,
      minimumQualification: this.editVacancyForm.get('minimumQualification')?.value || this.model.minimumQualification,
      jobDescription: this.editVacancyForm.get('jobDescription')?.value || this.model.jobDescription,
      experienceRequired: this.editVacancyForm.get('experienceRequired')?.value || this.model.experienceRequired,
      minimumSalary: this.editVacancyForm.get('minimumSalary')?.value || this.model.minimumSalary,
      maximumSalary: this.editVacancyForm.get('maximumSalary')?.value || this.model.maximumSalary,
      publishedBy: this.model.publishedBy,
      lastDate: this.model.lastDate,
      publishedDate: this.model.publishedDate,
    }
    this.email = localStorage.getItem('user-email');
    if(this.email && this.id){ 
      this.model.publishedBy = this.email;
      this.editVacancySubscription = this.employerService.updateVacancy(this.model, this.id).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.show(response.message);
            this.router.navigateByUrl('/vacancy');
          }
          else{
            this.error(response.message);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } 
  }

  onDelete(){
    if(this.id){
      this.employerService.deleteVacancy(this.id).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.show(response.message);
            this.router.navigateByUrl('/vacancy');
          }
          else{
            this.error(response.message);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.editVacancySubscription?.unsubscribe();
  }

  show(msg:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  
  error(msg:string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
