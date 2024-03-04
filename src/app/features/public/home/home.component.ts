import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VacancyResponse } from '../models/vacancy-response.model';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vacancies$?: Observable<VacancyResponse[]>;

  constructor(private publicService: PublicService){}

  ngOnInit(): void {
    this.vacancies$ = this.publicService.getAllVacancies();
  }
}
