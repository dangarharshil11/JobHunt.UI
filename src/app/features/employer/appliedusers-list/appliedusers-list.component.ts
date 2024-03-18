import { Component, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { EmployerService } from '../services/employer.service';
import { ApplicationResponse } from '../models/application-response.model';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-appliedusers-list',
  templateUrl: './appliedusers-list.component.html',
  styleUrls: ['./appliedusers-list.component.css']
})
export class AppliedusersListComponent implements AfterContentChecked{
  vacancyId: string | null = null;
  jobapplications!: ApplicationResponse[];
  totalRecords!: number;

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

    if(this.vacancyId && event.first != undefined && event.rows){
      this.employerService.paginationEndpoint({vacancyId: this.vacancyId, pageNumber: (event.first / event.rows) +1, pageSize: event.rows}).subscribe({
        next: (response) => {
          if(response.isSuccess){
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

  show(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  error(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: msg });
  }
}
