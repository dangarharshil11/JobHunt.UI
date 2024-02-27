import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy.model';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent implements OnInit {
  Vacancies$?: Observable<Vacancy[]>;
  organization: string | null = null;

  constructor(private employerService: EmployerService){
    
  }

  ngOnInit(): void {
    this.organization = localStorage.getItem('organization');
    if(this.organization){
      this.Vacancies$ = this.employerService.getVacancyByName(this.organization);
    }
  }
}
