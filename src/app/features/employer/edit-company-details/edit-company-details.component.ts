import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Organization } from '../models/organization.model';
import { EmployerService } from '../services/employer.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.css']
})
export class EditCompanyDetailsComponent implements OnInit, OnDestroy {
  profile: Organization;
  email?: string | null = null;
  
  editProfileSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private employerService: EmployerService, private messageService: MessageService, private fb: FormBuilder, private changeDetector: ChangeDetectorRef) {
    this.profile = {
      organization: '',
      organizationType: '',
      companyEmail: '',
      companyPhone: '',
      noOfEmployees: 0,
      startYear: 0,
      about: '',
      createdBy: '',
    }
  }

  editCompanyForm = this.fb.group({
    organization: ['', Validators.required],
    organizationType: ['', Validators.required],
    companyEmail: ['', Validators.required],
    companyPhone: ['', Validators.minLength(10)],
    noOfEmployees: [1, Validators.min(1)],
    startYear: new FormControl(2024, [Validators.min(1800), Validators.max(2024), Validators.required]),
    about: ['', Validators.minLength(50)],
  });

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    if (this.email) {
      this.employerService.getprofile(this.email).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.profile = response.result;
            this.editCompanyForm.setValue({
              organization: this.profile.organization,
              organizationType: this.profile.organizationType,
              companyPhone: this.profile.companyPhone,
              companyEmail: this.profile.companyEmail,
              noOfEmployees: this.profile.noOfEmployees,
              startYear: this.profile.startYear,
              about: this.profile.about,
            })
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  onFormSubmit() {
    this.profile = {
      organization: this.editCompanyForm.get('organization')?.value || this.profile.organization,
      organizationType: this.editCompanyForm.get('organizationType')?.value || this.profile.organizationType,
      companyEmail: this.editCompanyForm.get('companyEmail')?.value || this.profile.companyEmail,
      companyPhone: this.editCompanyForm.get('companyPhone')?.value || this.profile.companyPhone,
      noOfEmployees: this.editCompanyForm.get('noOfEmployees')?.value || this.profile.noOfEmployees,
      startYear: this.editCompanyForm.get('startYear')?.value || this.profile.startYear,
      about: this.editCompanyForm.get('about')?.value || this.profile.about,
      createdBy: this.profile.createdBy,
    }

    this.editProfileSubscription = this.employerService.updateProfile(this.profile).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.show();
          this.router.navigateByUrl(`/profile/${response.result.createdBy}`)
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

  ngOnDestroy(): void {
    this.editProfileSubscription?.unsubscribe();
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Organization Information Updated Successfully!' });
  }

  error(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
