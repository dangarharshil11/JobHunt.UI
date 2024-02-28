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
  Vacancies$?: Observable<VacancyResponse[]>;
  email: string | null = null;

  constructor(private employerService: EmployerService){
    
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    if(this.email){
      this.Vacancies$ = this.employerService.getVacancyByName(this.email);
    }
  }
}
