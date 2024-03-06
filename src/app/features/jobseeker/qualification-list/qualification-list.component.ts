import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { JobuserService } from '../services/jobuser.service';
import { QualificationResponse } from '../models/qualification-response.model';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})

export class QualificationListComponent implements OnInit {
  userId: string | null = null;
  qualifications?: QualificationResponse[];
  isQualificationsVisible: boolean = false;

  constructor(private jobuserService: JobuserService){}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    if(this.userId){
      this.jobuserService.getAllQualifications(this.userId).subscribe({
        next:(response) => {
          if(response.isSuccess && response.result?.length > 0){
            this.isQualificationsVisible = true;
            this.qualifications = response.result;
          }
        },
        error:(error) => {
          console.error(error);
        }
      });
    }
  }
}
