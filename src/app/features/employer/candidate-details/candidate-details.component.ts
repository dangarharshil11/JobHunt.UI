import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
    this.route.paramMap.subscribe({
      next: (response) => {
        this.userId = response.get("id");
      }
    })
    if(this.userId){
      this.employerService.getCandidateProfile(this.userId).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.isProfileVisible = true;
            this.profile = response.result;
          }
        },
        error: (error) =>{
          console.error(error);
        }
      });
      this.employerService.getAllQualifications(this.userId).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.isQualificationVisible = true;
            this.qualifications = response.result;
          }
        },
        error: (error) =>{
          console.error(error);
        }
      });
      this.employerService.getAllExperiences(this.userId).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.isExperiencesVisible = true;
            this.experiences = response.result;
          }
        },
        error: (error) =>{
          console.error(error);
        }
      });
    }
  }
}
