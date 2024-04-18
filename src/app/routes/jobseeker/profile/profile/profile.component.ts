import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { JobuserService } from '../../services/jobuser.service';
import { QualificationResponse } from '../../models/qualification-response.model';
import { ExperienceResponse } from '../../models/experience-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile?: User;
  isProfileVisible: boolean = false;
  qualifications?: QualificationResponse[];
  isQualificationVisible: boolean = false;
  experiences?: ExperienceResponse[];
  isExperiencesVisible: boolean = false;
  email: string | null = null;
  id: string | null = null;

  constructor(private jobuserService: JobuserService){
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('user-email');
    this.id = localStorage.getItem('user-id')
    if(this.email && this.id){
      // Retrieving User Profile by email
      this.jobuserService.getProfile(this.email).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.isProfileVisible = true;
            this.profile = response.result;
          }
        }
      });

      // Retrieving User's all Qualifications
      this.jobuserService.getAllQualifications(this.id).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result.length > 0){
            this.isQualificationVisible = true;
            this.qualifications = response.result;
          }
        }
      });

      // Retrieving User's all Experiences
      this.jobuserService.getAllExperiences(this.id).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result.length > 0){
            this.isExperiencesVisible = true;
            this.experiences = response.result;
          }
        }
      });
    }
  }
}
