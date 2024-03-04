import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ExperienceResponse } from '../models/experience-response.model';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.css']
})
export class ExperienceDetailsComponent implements OnInit {
  experience$?: Observable<ExperienceResponse>;
  id: string | null = null;

  constructor(private jobuserservice: JobuserService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    if(this.id){
      this.experience$ = this.jobuserservice.getExperienceById(this.id);
    }
  }
}
