import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PublicService } from '../services/public.service';
import { VacancyResponse } from '../models/vacancy-response.model';
import { Organization } from '../models/organization.model';

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

  constructor(private readonly publicService: PublicService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    this.userId = localStorage.getItem('user-id');

    if(this.id){
      this.vacancy$ = this.publicService.getVacancyById(this.id);
      this.vacancy$.pipe().subscribe({
        next: (response) => {
          this.profile$ = this.publicService.getProfileByName(response.publishedBy);
        }
      })
    }
  }

  onApply(vacanyId: string){
    console.log("applied Successfully");
    this.router.navigateByUrl('');
  }
}
