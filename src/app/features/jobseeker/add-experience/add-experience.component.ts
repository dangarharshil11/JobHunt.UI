import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExperienceRequest } from '../models/experience-request.model';
import { JobuserService } from '../services/jobuser.service';
import { MessageService } from 'primeng/api';

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

  constructor(private jobuserService: JobuserService, private router: Router, private messageService: MessageService){
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
          this.show();
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

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Experience Added Successfully!' });
  }
}
