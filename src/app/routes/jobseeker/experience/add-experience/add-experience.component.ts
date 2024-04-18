import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExperienceRequest } from '../../models/experience-request.model';
import { JobuserService } from '../../services/jobuser.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent {
  model: ExperienceRequest;
  id: string | null = null;

  addExperienceSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router, private toasterService: ToasterService, private fb: FormBuilder){
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

  addExperienceForm = this.fb.group({
    designation: ['', Validators.required],
    companyName: ['', Validators.required],
    companyUrl: ['', Validators.required],
    jobDescription: ['', Validators.required],
  });
 
  ngOnInit(): void {
    this.id = localStorage.getItem('user-id');
    if(this.id){
      this.model.userId = this.id;
    }
  }

  onFormSubmit(){
    this.model = {
      userId: this.model.userId,
      companyName: this.addExperienceForm.get('companyName')?.value || '',
      startYear: this.model.startYear,
      endYear: this.model.endYear,
      designation: this.addExperienceForm.get('designation')?.value || '',
      companyUrl: this.addExperienceForm.get('companyUrl')?.value || '',
      jobDescription: this.addExperienceForm.get('jobDescription')?.value || '',
    }

    this.addExperienceSubscription$ = this.jobuserService.addExperience(this.model).subscribe({
      next: (response) =>{
        if(response.isSuccess){
          this.toasterService.showSuccess('Experience Added Successfully!');
          this.router.navigateByUrl(`/experience/${this.id}`);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.addExperienceSubscription$?.unsubscribe();
  }
}
