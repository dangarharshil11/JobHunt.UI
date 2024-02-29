import { Component } from '@angular/core';

import { ExperienceRequest } from '../models/experience-request.model';
import { Subscription } from 'rxjs';
import { JobuserService } from '../services/jobuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent {
  model: ExperienceRequest;
  id: string | null = null;
  error: string = '';

  addExperienceSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router){
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
    this.id = localStorage.getItem('user-id');
    if(this.id){
      this.model.userId = this.id;
    }
  }

  onFormSubmit(){
    if(this.model.companyName == '' || this.model.startYear == new Date() || this.model.endYear == new Date() ||
      this.model.designation == '' || this.model.companyUrl == '' || this.model.jobDescription == ''){
        this.error = 'Enter All the details'
    }
    else{
      this.addExperienceSubscription$ = this.jobuserService.addExperience(this.model).subscribe({
        next: (response) =>{
          this.router.navigateByUrl(`/experience/${this.id}`);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.addExperienceSubscription$?.unsubscribe();
  }
}
