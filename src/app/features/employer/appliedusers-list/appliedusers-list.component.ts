import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../services/employer.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationResponse } from '../models/application-response.model';

@Component({
  selector: 'app-appliedusers-list',
  templateUrl: './appliedusers-list.component.html',
  styleUrls: ['./appliedusers-list.component.css']
})
export class AppliedusersListComponent implements OnInit {
  vacancyId: string | null = null;
  jobapplications$?: Observable<ApplicationResponse[]>
  constructor(private employerService: EmployerService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.vacancyId = response.get('id');
      }
    });

    if(this.vacancyId){
      this.jobapplications$ = this.employerService.getApplicationsByVacancyId(this.vacancyId)
    }
  }
}
