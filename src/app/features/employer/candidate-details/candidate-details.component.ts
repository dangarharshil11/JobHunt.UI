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
  profile$?: Observable<User>;
  qualifications$?: Observable<QualificationResponse[]>;
  experiences$?: Observable<ExperienceResponse[]>;
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
      this.profile$ = this.employerService.getCandidateProfile(this.userId);
      this.qualifications$ = this.employerService.getAllQualifications(this.userId);
      this.experiences$ = this.employerService.getAllExperiences(this.userId);
    }
  }
}
