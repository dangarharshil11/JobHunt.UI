import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { EmployerService } from '../../services/employer.service';
import { VacancyResponse } from '../../models/vacancy-response.model';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent implements OnInit {
  Vacancies: VacancyResponse[];
  isVacanciesVisible: boolean = false;
  email: string | null = null;
  @ViewChild('dt1') dt1: Table | undefined;

  constructor(private employerService: EmployerService){
    this.Vacancies = [];
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
        }
      });
    }
  }

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
