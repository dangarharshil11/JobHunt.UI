import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QualificationResponse } from '../models/qualification-response.model';
import { ActivatedRoute } from '@angular/router';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-qualification-details',
  templateUrl: './qualification-details.component.html',
  styleUrls: ['./qualification-details.component.css']
})
export class QualificationDetailsComponent implements OnInit {
  qualification$?: Observable<QualificationResponse>;
  id: string | null = null;

  constructor(private route: ActivatedRoute, private jobuserService: JobuserService){}

  ngOnInit(){
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    if(this.id){
      this.qualification$ = this.jobuserService.getQualificationById(this.id);
    }
  }
}
