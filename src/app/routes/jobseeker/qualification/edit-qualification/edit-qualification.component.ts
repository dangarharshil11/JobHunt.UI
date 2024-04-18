import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { QualificationRequest } from '../../models/qualification-request.model';
import { JobuserService } from '../../services/jobuser.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-qualification',
  templateUrl: './edit-qualification.component.html',
  styleUrls: ['./edit-qualification.component.css']
})
export class EditQualificationComponent {
  model: QualificationRequest;
  id: string | null = null;
  userId: string | null = null;

  editQualificationSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.model = {
      userId: '',
      qualificationName: '',
      university: '',
      yearsOfCompletion: 0,
      gradeOrScore: ''
    }
  }

  editQualificationForm = this.fb.group({
    qualificationName: ['', Validators.required],
    yearsOfCompletion: new FormControl(new Date().getFullYear(), [Validators.min(1900), Validators.max(2024)]),
    gradeOrScore: ['', Validators.required],
    university: ['', Validators.required],
  })

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    });

    if (this.id && this.userId) {
      this.model.userId = this.userId;
      this.jobuserService.getQualificationById(this.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.model = response.result;
            this.editQualificationForm.setValue({
              qualificationName: this.model.qualificationName,
              yearsOfCompletion: this.model.yearsOfCompletion,
              gradeOrScore: this.model.gradeOrScore,
              university: this.model.university,
            });
          }
          else {
            this.error(response.message);
          }
        }
      });
    }
  }

  // Method for updating User's Qualification
  onFormSubmit() {
    this.model = {
      userId: this.model.userId,
      qualificationName: this.editQualificationForm.get('qualificationName')?.value || this.model.qualificationName,
      yearsOfCompletion: this.editQualificationForm.get('yearsOfCompletion')?.value || this.model.yearsOfCompletion,
      gradeOrScore: this.editQualificationForm.get('gradeOrScore')?.value || this.model.gradeOrScore,
      university: this.editQualificationForm.get('university')?.value || this.model.university,
    }

    if (this.id) {
      this.editQualificationSubscription$ = this.jobuserService.editQualification(this.model, this.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.show(response.message);
            this.router.navigateByUrl(`/qualification/${this.id}`);
          }
          else {
            this.error(response.message);
          }
        }
      });
    }
  }

  // Method for deleting User's Qualification
  onDelete() {
    if (this.id) {
      this.jobuserService.deleteQualification(this.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.show(response.message);
            this.router.navigateByUrl(`/qualification/${this.id}`);
          }
          else {
            this.error(response.message);
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.editQualificationSubscription$?.unsubscribe();
  }

  show(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  error(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
