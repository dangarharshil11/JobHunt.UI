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
  experiences$?: Observable<ExperienceResponse[]>;

  constructor(private jobuserService: JobuserService){}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    if(this.userId){
      this.experiences$ = this.jobuserService.getAllExperiences(this.userId);
    }
  }
}
