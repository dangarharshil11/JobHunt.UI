import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PublicService } from '../services/public.service';
import { VacancyResponse } from '../models/vacancy-response.model';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {
  id: string | null = null;
  vacancy$?: Observable<VacancyResponse>;

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
