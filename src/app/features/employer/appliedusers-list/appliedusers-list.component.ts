import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private employerService: EmployerService, private route: ActivatedRoute){}

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
}
