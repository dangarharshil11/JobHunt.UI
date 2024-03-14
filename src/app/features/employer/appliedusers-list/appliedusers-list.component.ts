import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { EmployerService } from '../services/employer.service';
import { ApplicationResponse } from '../models/application-response.model';

@Component({
  selector: 'app-appliedusers-list',
  templateUrl: './appliedusers-list.component.html',
  styleUrls: ['./appliedusers-list.component.css']
})
export class AppliedusersListComponent implements OnInit {
  vacancyId: string | null = null;
  jobapplications?: ApplicationResponse[];
  isjobApplicationsVisible: boolean = false;

  constructor(private employerService: EmployerService, private route: ActivatedRoute, private messageService: MessageService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.vacancyId = response.get('id');
      }
    });

    if(this.vacancyId){
      this.employerService.getApplicationsByVacancyId(this.vacancyId).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result?.length > 0){
            this.isjobApplicationsVisible = true;
            this.jobapplications = response.result;
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onClick(status: string, jobapplication: ApplicationResponse){
    this.employerService.processApplication(status, jobapplication.id).subscribe({
      next: (response) => {
        if(response.isSuccess){
          jobapplication.applicationStatus = status
          if(status == "ACCEPTED"){
            this.show("Job Application Accepted!");
          }
          else{
            this.error("Job Application Rejected!");
          }
        }
        else{
          this.error(response.message);
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  show(msg:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  error(msg:string) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: msg });
  }
}
