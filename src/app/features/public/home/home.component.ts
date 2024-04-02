import { Component, OnInit } from '@angular/core';

import { VacancyResponse } from '../models/vacancy-response.model';
import { Response } from '../models/response-model';
import { PublicService } from '../services/public.service';
import { Observable } from 'rxjs';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response$?: Observable<Response>;

  vacancies?: VacancyResponse[];
  allvacancies?: VacancyResponse[];
  isVacancyVisible: boolean = false;

  first: number = 0;
  rows: number = 3;
  searchText: string = '';
  totalRecords: number = 0;

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {  
    this.response$ = this.publicService.getAllVacancies();

    this.response$.subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.isVacancyVisible = true;
          this.allvacancies = response.result;
          this.vacancies = this.allvacancies?.slice(this.first, this.first+this.rows);
          this.totalRecords = this.allvacancies?.length || 0;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });    
  }

  filterResults(text?: string) {
    this.vacancies = this.allvacancies;
    if (!text || text == '') {
      this.searchText = '';
      this.vacancies = this.vacancies?.slice(this.first, this.first+this.rows);
      this.totalRecords = this.allvacancies?.length || 0;
      return;
    }
    this.searchText = text;
    this.vacancies = this.vacancies?.filter(vacancy =>
      vacancy.jobTitle.toLowerCase().includes(text.trim().toLowerCase()) ||
      vacancy.publishedBy.toLowerCase().includes(text.trim().toLowerCase())
    );
    this.totalRecords = this.vacancies?.length || 0;
    this.vacancies = this.vacancies?.slice(this.first, this.first+this.rows);
  }

  onPageChange(event: PageEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 3;
    this.vacancies = this.allvacancies?.filter(vacancy =>
      vacancy.jobTitle.toLowerCase().includes(this.searchText.trim().toLowerCase()) ||
      vacancy.publishedBy.toLowerCase().includes(this.searchText.trim().toLowerCase())
    ).slice(this.first, this.first+this.rows);
  }
}
