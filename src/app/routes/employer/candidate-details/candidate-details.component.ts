import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployerService } from '../services/employer.service';
import { User } from '../models/user.model';
import { QualificationResponse } from '../models/qualification-response.model';
import { ExperienceResponse } from '../models/experience-response.model';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent {
  profile?: User;
  isProfileVisible: boolean = false;
  qualifications?: QualificationResponse[];
  isQualificationVisible: boolean = false;
  experiences?: ExperienceResponse[];
  isExperiencesVisible: boolean = false;
  email: string | null = null;
  userId: string | null = null;

  constructor(private employerService: EmployerService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    // Retrieve UserId from url
    this.route.paramMap.subscribe({
      next: (response) => {
        this.userId = response.get("id");
      }
    });

    if(this.userId){
      // Retrieve Candidate Profile based on userId
      this.employerService.getCandidateProfile(this.userId).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result){
            this.isProfileVisible = true;
            this.profile = response.result;
          }
        }
      });

      // Retrieve Candidate's Qualifications based on userId
      this.employerService.getAllQualifications(this.userId).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result.length > 0){
            this.isQualificationVisible = true;
            this.qualifications = response.result;
          }
        }
      });

      // Retrieve Candidate's Experiences based on userId
      this.employerService.getAllExperiences(this.userId).subscribe({
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
