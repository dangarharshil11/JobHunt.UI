import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { JobuserService } from '../services/jobuser.service';
import { QualificationResponse } from '../models/qualification-response.model';
import { ExperienceResponse } from '../models/experience-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$?: Observable<User>;
  qualifications$?: Observable<QualificationResponse[]>;
  experiences$?: Observable<ExperienceResponse[]>;
  email: string | null = null;
  id: string | null = null;

  constructor(private jobuserService: JobuserService){
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    this.id = localStorage.getItem('user-id')
    if(this.email && this.id){
      this.profile$ = this.jobuserService.getProfile(this.email);
      this.qualifications$ = this.jobuserService.getAllQualifications(this.id);
      this.experiences$ = this.jobuserService.getAllExperiences(this.id);
    }
  }
}
