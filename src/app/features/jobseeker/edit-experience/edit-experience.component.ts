import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExperienceRequest } from '../models/experience-request.model';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent {
  model: ExperienceRequest;
  id: string | null = null;
  userId: string | null = null;
  error: string = '';

  editExperienceSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router, private route: ActivatedRoute){
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
 
  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');     
      }
    });

    if(this.userId && this.id){
      this.model.userId = this.userId;
      this.jobuserService.getExperienceById(this.id).subscribe({
        next: (response) => {
          this.model = response.result;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onFormSubmit(){
    if(this.model.companyName == '' || this.model.startYear == new Date() || this.model.endYear == new Date() ||
      this.model.designation == '' || this.model.companyUrl == '' || this.model.jobDescription == ''){
        this.error = 'Enter All the details'
    }
    else{
      if(this.id){
        this.editExperienceSubscription$ = this.jobuserService.editExperience(this.model, this.id).subscribe({
          next: (response) =>{
            this.router.navigateByUrl(`/experience/${this.id}`);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    }
  }

  onDelete(){
    if(this.id){
      this.jobuserService.deleteExperience(this.id).subscribe({
        next: (response) =>{
          this.router.navigateByUrl(`/experience/${this.id}`);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.editExperienceSubscription$?.unsubscribe();
  }
}
