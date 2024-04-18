import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Organization } from '../../models/organization.model';
import { EmployerService } from '../../services/employer.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.css']
})
export class EditCompanyDetailsComponent implements OnInit, OnDestroy {
  profile: Organization;
  email?: string | null = null;
  file?: File;
  userId: string | null = null;

  editProfileSubscription?: Subscription;

  constructor(private router: Router, private employerService: EmployerService, private toasterService: ToasterService, private fb: FormBuilder, private changeDetector: ChangeDetectorRef) {
    this.profile = {
      organization: '',
      organizationType: '',
      companyEmail: '',
      companyPhone: '',
      noOfEmployees: 0,
      startYear: 0,
      about: '',
      createdBy: '',
      imageUrl: ''
    }
  }

  editCompanyForm = this.fb.group({
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

  ngOnInit(): void {
    // Retrieving email from localStorage
    this.email = localStorage.getItem('user-email');
    if (this.email) {
      // Retrieving Organization Profile based on email
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
      imageUrl: this.profile.imageUrl
    }

    if (localStorage.getItem('user-id')) {
      this.userId = localStorage.getItem('user-id');
    }
    if (this.userId != null) {
      // Update Profile with new image
      if (this.file) {
        // Upload Image if new image Provided by user
        this.employerService.uploadImage(this.file, this.userId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.profile.imageUrl = response.result;
              // update organization profile
              this.updateProfile();
            }
            else {
              this.toasterService.showError(response.message);
            }
          }
        });
      }
      // Update Profile without new image
      else {
        this.updateProfile();
      }
    }
  }

  updateProfile(){
    this.editProfileSubscription = this.employerService.updateProfile(this.profile).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.toasterService.showSuccess('Organization Information Updated Successfully!');
          this.router.navigateByUrl(`/profile/${response.result.createdBy}`)
        }
        else {
          this.toasterService.showError(response.message);
        }
      }
    });
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  ngOnDestroy(): void {
    this.editProfileSubscription?.unsubscribe();
  }
}
