import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployerService } from '../services/employer.service';
import { VacancyResponse } from '../models/vacancy-response.model';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent implements OnInit {
  Vacancies?: VacancyResponse[];
  isVacanciesVisible: boolean = false;
  email: string | null = null;

  constructor(private employerService: EmployerService){
    
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    if(this.email){
      this.employerService.getVacancyByName(this.email).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result?.length > 0){
            this.isVacanciesVisible = true;
            this.Vacancies = response.result;
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
