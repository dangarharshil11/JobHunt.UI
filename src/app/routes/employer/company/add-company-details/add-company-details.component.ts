import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Organization } from '../../models/organization.model';
import { EmployerService } from '../../services/employer.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-add-company-details',
  templateUrl: './add-company-details.component.html',
  styleUrls: ['./add-company-details.component.css'],
})
export class AddCompanyDetailsComponent implements OnDestroy, OnInit {
  profile: Organization;
  email?: string | null = null;
  file?: File;
  imageFlag: boolean = false;
  userId: string = '';

  addProfileSubscription?: Subscription;

  constructor(
    private router: Router,
    private employerService: EmployerService,
    private toasterService: ToasterService,
    private fb: FormBuilder
  ) {
    this.profile = {
      organization: '',
      organizationType: '',
      companyEmail: '',
      companyPhone: '',
      noOfEmployees: 0,
      startYear: 0,
      about: '',
      createdBy: '',
      imageUrl: '',
    };
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    if (this.email) {
      this.profile.createdBy = this.email;
    }
  }

  addCompanyForm = this.fb.group({
    organization: ['', Validators.required],
    organizationType: ['', Validators.required],
    companyEmail: ['', [Validators.required, Validators.email]],
    companyPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    noOfEmployees: [1, Validators.min(1)],
    startYear: [2024, [
      Validators.min(1900),
      Validators.max(2024),
    ]],
    about: ['', Validators.minLength(50)],
  });

  onFormSubmit() {
    this.profile = {
      organization: this.addCompanyForm.get('organization')?.value || '',
      organizationType:
        this.addCompanyForm.get('organizationType')?.value || '',
      companyEmail: this.addCompanyForm.get('companyEmail')?.value || '',
      companyPhone: this.addCompanyForm.get('companyPhone')?.value || '',
      noOfEmployees: this.addCompanyForm.get('noOfEmployees')?.value || 1,
      startYear: this.addCompanyForm.get('startYear')?.value || 2024,
      about: this.addCompanyForm.get('about')?.value || '',
      createdBy: this.profile.createdBy,
      imageUrl: this.profile.imageUrl,
    };

    if (!this.file) {
      this.imageFlag = true;
    } else {
      if (localStorage.getItem('user-id')) {
        this.userId = localStorage.getItem('user-id') || '';
      }
      if (this.userId != '') {
        // First Image will be uploded
        this.employerService.uploadImage(this.file, this.userId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.profile.imageUrl = response.result;
              // Profile will be created
              this.addProfileSubscription = this.employerService
                .createProfile(this.profile)
                .subscribe({
                  next: (response) => {
                    if (response.isSuccess) {
                      this.toasterService.showSuccess('Organization Information Added Successfully!');
                      this.router.navigateByUrl(`/profile/${this.email}`);
                    } else {
                      this.toasterService.showError(response.message);
                    }
                  },
                });
            }
          },
        });
      }
    }
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  ngOnDestroy(): void {
    this.addProfileSubscription?.unsubscribe();
  }
}
