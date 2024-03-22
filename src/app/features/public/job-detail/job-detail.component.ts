import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PublicService } from '../services/public.service';
import { VacancyResponse } from '../models/vacancy-response.model';
import { Organization } from '../models/organization.model';
import { ApplicationRequest } from '../models/application-request.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  id: string | null = null;
  userId: string | null = null;
  userRoles?: string[] = [];
  vacancy?: VacancyResponse;
  isVacancyVisible: boolean = false;
  profile?: Organization;
  isProfileVisible: boolean = false;
  request: ApplicationRequest;

  constructor(private readonly publicService: PublicService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
    this.request = {
      appliedDate: new Date(),
      vacancyId: '',
      userId: '',
    }

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
        this.userId = localStorage.getItem('user-id');
        this.userRoles = localStorage.getItem('user-roles')?.split(',');
      }
    });

    if (this.id) {
      this.publicService.getVacancyById(this.id).subscribe({
        next: (response) => {
          this.isVacancyVisible = true;
          this.vacancy = response.result
          if (this.vacancy) {
            this.publicService.getProfileByName(this.vacancy?.publishedBy).subscribe({
              next: (response) => {
                this.isProfileVisible = true;
                this.profile = response.result
              },
              error: (error) => {
                console.error(error);
              }
            })
          }
        },
        error: (error) => {
          console.error(error);
        }
      });

      this.request.vacancyId = this.id;
    }
    if (this.userId) {
      this.request.userId = this.userId;
    }
  }

  onApply() {
    if (this.userRoles?.includes("JobSeeker")) {
      this.publicService.getUserDetails(this.request.userId).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.publicService.apply(this.request).subscribe({
              next: (response) => {
                if (response.isSuccess) {
                  this.show("Applied Successfully!");
                  this.router.navigateByUrl("/applications");
                }
                else {
                  this.error(response.message);
                }
              },
              error: (error) => {
                console.error(error);
              }
            });
          }
          else{
            this.error("Please Add your Profile Before Applying")
          }
        },
        error: (error) => {
          console.error(error);
        }
      })

    }
    else {
      this.error("You Must Login as a JobSeeker to apply for any vacancy");
    }
  }

  show(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  error(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
