import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { QualificationRequest } from '../../models/qualification-request.model';
import { JobuserService } from '../../services/jobuser.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.css']
})
export class AddQualificationComponent implements OnInit, OnDestroy {
  model: QualificationRequest;
  id: string | null = null;

  addQualificationSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router, private toasterService: ToasterService, private fb: FormBuilder){
    this.model = {
      userId: '',
      qualificationName: '',
      university: '',
      yearsOfCompletion: 0,
      gradeOrScore: ''
    }
  }

  addQualificationForm = this.fb.group({
    qualificationName: ['', Validators.required],
    yearsOfCompletion: new FormControl(2024, [ Validators.min(1900), Validators.max(2024)]),
    gradeOrScore: ['', Validators.required],
    university: ['', Validators.required],
  })
 
  ngOnInit(): void {
    this.id = localStorage.getItem('user-id');
    if(this.id){
      this.model.userId = this.id;
    }
  }

  onFormSubmit(){
    this.model = {
      userId: this.model.userId,
      qualificationName: this.addQualificationForm.get('qualificationName')?.value || '',
      yearsOfCompletion: this.addQualificationForm.get('yearsOfCompletion')?.value || 0,
      gradeOrScore: this.addQualificationForm.get('gradeOrScore')?.value || '',
      university: this.addQualificationForm.get('university')?.value || '',
    }
    
    this.addQualificationSubscription$ = this.jobuserService.addQualification(this.model).subscribe({
      next: (response) =>{
        if(response.isSuccess){
          this.toasterService.showSuccess('Qualification Added Successfully!');
          this.router.navigateByUrl(`/qualification/${this.id}`);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.addQualificationSubscription$?.unsubscribe();
  }
}
