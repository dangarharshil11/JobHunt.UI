import { Component, OnInit } from '@angular/core';

import { VacancyResponse } from '../models/vacancy-response.model';
import { PublicService } from '../services/public.service';

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
  vacancies?: VacancyResponse[];
  allvacancies?: VacancyResponse[];
  isVacancyVisible: boolean = false;
  first: number = 0;
  rows: number = 3;
  searchText: string = '';
  totalRecords: number = 0;

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.getAllVacancies().subscribe({
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
    this.vacancies = this.allvacancies?.slice(this.first, this.first+this.rows);
    if (!text) {
      this.totalRecords = this.allvacancies?.length || 0;
      return;
    }
    this.searchText = text;
    this.vacancies = this.vacancies?.filter(vacancy =>
      vacancy.jobTitle.toLowerCase().includes(text.trim().toLowerCase()) ||
      vacancy.publishedBy.toLowerCase().includes(text.trim().toLowerCase())
    );
    this.totalRecords = this.vacancies?.length || 0;
  }

  onPageChange(event: PageEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 3;
    this.vacancies = this.allvacancies?.slice(this.first, this.first+this.rows).filter(vacancy =>
      vacancy.jobTitle.toLowerCase().includes(this.searchText.trim().toLowerCase()) ||
      vacancy.publishedBy.toLowerCase().includes(this.searchText.trim().toLowerCase())
    );;
  }
}
