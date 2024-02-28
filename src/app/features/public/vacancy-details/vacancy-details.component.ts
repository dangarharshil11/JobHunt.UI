import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy.model';
import { PublicService } from '../services/public.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {
  id: string | null = null;
  vacancy$?: Observable<Vacancy>;

  constructor(private readonly publicService: PublicService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    if(this.id){
      this.vacancy$ = this.publicService.getVacancyById(this.id)
    }
  }


}
