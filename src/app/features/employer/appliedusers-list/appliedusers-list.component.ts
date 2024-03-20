import { Component, ChangeDetectorRef, AfterContentChecked, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';

import { EmployerService } from '../services/employer.service';
import { ApplicationResponse } from '../models/application-response.model';
import { SP_VacancyRequestDto } from '../models/SP_VacancyRequest.model';

@Component({
  selector: 'app-appliedusers-list',
  templateUrl: './appliedusers-list.component.html',
  styleUrls: ['./appliedusers-list.component.css']
})
export class AppliedusersListComponent implements AfterContentChecked {
  vacancyId: string | null = null;
  jobapplications!: ApplicationResponse[];
  totalRecords!: number;
  request: SP_VacancyRequestDto = {};
  @ViewChild('dt1') dt1: Table | undefined;

  constructor(private employerService: EmployerService, private route: ActivatedRoute, private messageService: MessageService, private changeDetector: ChangeDetectorRef) { }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  loadCustomers(event: TableLazyLoadEvent) {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.vacancyId = response.get('id');
      }
    });

    this.request.sortCoumnName = event.sortField?.toString();
    this.request.sortCoumnDirection = event.sortOrder == 1 ? 'ASC' : 'DESC';
    this.request.startIndex = event.first;
    if (this.vacancyId && event.rows){
      this.request.pageSize = event.rows;
      this.request.vacancyId = this.vacancyId;
    }

    if (this.request) {
      this.getData(this.request);
    }
  }

  onClick(status: string, jobapplication: ApplicationResponse) {
    this.employerService.processApplication(status, jobapplication.id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          jobapplication.applicationStatus = status
          if (status == "ACCEPTED") {
            this.show("Job Application Accepted!");
          }
          else {
            this.error("Job Application Rejected!");
          }
        }
        else {
          this.error(response.message);
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  applyFilterGlobal(text: string) {
    this.request.searchText = text;
    this.getData(this.request);
  }

  applyfilter(name: string, email: string, toDate: string, fromDate: string, status: string) {
    this.request.fullName = name;
    this.request.email = email;
    this.request.toDate = toDate;
    this.request.fromDate = fromDate;
    this.request.applicationStatus = status;
    this.getData(this.request);
  }

  show(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  error(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: msg });
  }

  getData(request: SP_VacancyRequestDto) {
    this.employerService.paginationEndpoint(this.request).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.totalRecords = response.result.totalRecords;
          this.jobapplications = response.result.results;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
