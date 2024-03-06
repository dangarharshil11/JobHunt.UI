import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmployerService } from '../services/employer.service';
import { VacancyRequest } from '../models/vacancy-request.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent implements OnInit, OnDestroy {
  model: VacancyRequest;
  error: string = '';
  email: string | null = null;
  id: string | null = null;
  
  editVacancySubscription?: Subscription;

  constructor(private employerService: EmployerService, private router: Router, private route: ActivatedRoute, private messageService: MessageService){
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
          }
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
    
  }

  onFormSubmit(){
    this.email = localStorage.getItem('user-email');
    if(this.email && this.id){ 
      this.model.publishedBy = this.email;
      this.editVacancySubscription = this.employerService.updateVacancy(this.model, this.id).subscribe({
        next: (response) => {
          this.show('Vacancy Updated Successfully!');
          this.router.navigateByUrl('/vacancy');
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
          this.show('Vacancy Deleted Successfully!');
          this.router.navigateByUrl('/vacancy');
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
}
