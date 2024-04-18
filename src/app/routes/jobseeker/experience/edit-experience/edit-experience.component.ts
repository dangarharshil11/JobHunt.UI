import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExperienceRequest } from '../../models/experience-request.model';
import { JobuserService } from '../../services/jobuser.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent {
  model: ExperienceRequest;
  id: string | null = null;
  userId: string | null = null;

  editExperienceSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private messageService: MessageService) {
    this.model = {
      userId: '',
      companyName: '',
      startYear: new Date(),
      endYear: new Date(),
      designation: '',
      companyUrl: '',
      jobDescription: '',
    }
  }

  editExperienceForm = this.fb.group({
    designation: ['', Validators.required],
    companyName: ['', Validators.required],
    companyUrl: ['', Validators.required],
    jobDescription: ['', Validators.required],
  });

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    });

    if (this.userId && this.id) {
      this.model.userId = this.userId;
      // Retrieving User Experience By Id
      this.jobuserService.getExperienceById(this.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.model = response.result;
            this.editExperienceForm.setValue({
              designation: this.model.designation,
              companyName: this.model.companyName,
              companyUrl: this.model.companyUrl,
              jobDescription: this.model.jobDescription
            });
          }
          else {
            this.error(response.message);
          }
        }
      });
    }
  }

  // Method for Updating User Experience
  onFormSubmit() {
    this.model = {
      userId: this.model.userId,
      companyName: this.editExperienceForm.get('companyName')?.value || this.model.companyName,
      startYear: this.model.startYear,
      endYear: this.model.endYear,
      designation: this.editExperienceForm.get('designation')?.value || this.model.designation,
      companyUrl: this.editExperienceForm.get('companyUrl')?.value || this.model.companyUrl,
      jobDescription: this.editExperienceForm.get('jobDescription')?.value || this.model.jobDescription,
    }

    if (this.id) {
      this.editExperienceSubscription$ = this.jobuserService.editExperience(this.model, this.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.show(response.message)
            this.router.navigateByUrl(`/experience/${this.id}`);
          }
          else {
            this.show(response.message);
          }
        }
      });
    }
  }

  // Method for Deleting User Experience
  onDelete() {
    if (this.id) {
      this.jobuserService.deleteExperience(this.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.show(response.message)
            this.router.navigateByUrl(`/experience/${this.id}`);
          }
          else {
            this.show(response.message);
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.editExperienceSubscription$?.unsubscribe();
  }

  show(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  error(msg: string) {
    this.messageService.add({ severity: 'Error', summary: 'Error', detail: msg });
  }
}
