import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { VacancyResponse } from '../models/vacancy-response.model';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})
export class VacancyDetailComponent {
  id: string | null = null;
  vacancy$?: Observable<VacancyResponse>;

  constructor(private readonly employerService: EmployerService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    if(this.id){
      this.vacancy$ = this.employerService.getVacancyById(this.id)
    }
  }
}
