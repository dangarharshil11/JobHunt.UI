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
  vacancies?: VacancyResponse[];
  allvacancies?: VacancyResponse[];
  isVacancyVisible: boolean = false;

  constructor(private publicService: PublicService){}

  ngOnInit(): void {
    this.publicService.getAllVacancies().subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.isVacancyVisible = true;
          this.vacancies = response.result
          this.allvacancies = response.result;
        }
      },
      error: (error) =>{
        console.error(error);
      }
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.vacancies = this.allvacancies;
      return;
    }
    
    this.vacancies = this.vacancies?.filter(vacancy => 
      vacancy.jobTitle.toLowerCase().includes(text.toLowerCase()) ||
      vacancy.publishedBy.toLowerCase().includes(text.toLowerCase())
    );
  }
}
