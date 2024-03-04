import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PublicService } from '../services/public.service';
import { VacancyResponse } from '../models/vacancy-response.model';
import { Organization } from '../models/organization.model';
import { ApplicationRequest } from '../models/application-request.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  id: string | null = null;
  userId: string | null = null;
  vacancy$?: Observable<VacancyResponse>;
  profile$?: Observable<Organization>;
  request: ApplicationRequest;

  constructor(private readonly publicService: PublicService, private route: ActivatedRoute, private router: Router){
    this.request = {
      appliedDate: new Date(),
      vacancyId: '',
      userId: '',
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    this.userId = localStorage.getItem('user-id');

    if(this.id && this.userId){
      this.vacancy$ = this.publicService.getVacancyById(this.id);
      this.vacancy$.pipe().subscribe({
        next: (response) => {
          this.profile$ = this.publicService.getProfileByName(response.publishedBy);
        }
      })
      this.request.vacancyId = this.id;
      this.request.userId = this.userId;
    }
  }

  onApply(){
    this.publicService.apply(this.request).subscribe({
      next: (response) => {
        this.router.navigateByUrl("/applications");
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
