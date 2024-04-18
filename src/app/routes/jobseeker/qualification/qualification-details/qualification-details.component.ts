import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QualificationResponse } from '../../models/qualification-response.model';
import { JobuserService } from '../../services/jobuser.service';

@Component({
  selector: 'app-qualification-details',
  templateUrl: './qualification-details.component.html',
  styleUrls: ['./qualification-details.component.css']
})

export class QualificationDetailsComponent implements OnInit {
  qualification?: QualificationResponse;
  id: string | null = null;
  isQualificationVisible: boolean = false;

  constructor(private route: ActivatedRoute, private jobuserService: JobuserService){}

  ngOnInit(){
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get("id");
      }
    });

    if(this.id){
      this.jobuserService.getQualificationById(this.id).subscribe({
        next:(response) => {
          if(response.isSuccess){
            this.isQualificationVisible = true;
            this.qualification = response.result;
          }
        }
      });
    }
  }
}
