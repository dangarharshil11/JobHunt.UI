import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { JobuserService } from '../services/jobuser.service';
import { ExperienceResponse } from '../models/experience-response.model';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent {
  userId: string | null = null;
  experiences: ExperienceResponse[];
  isExperiencesVisible: boolean = false;

  constructor(private jobuserService: JobuserService){
    this.experiences = [];
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    if(this.userId){
      this.jobuserService.getAllExperiences(this.userId).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result?.length > 0){
            this.experiences = response.result;
            this.isExperiencesVisible = true;
          }
        },
        error:(error) => {
          console.error(error);
        }
      });
    }
  }
}
