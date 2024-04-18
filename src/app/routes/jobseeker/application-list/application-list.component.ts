import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationResponse } from '../models/application-response.model';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationResponse[];
  isApplicationVisible: boolean = false;
  userId: string | null = null;

  constructor(private jobuserService: JobuserService){
    this.applications = [];
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    if(this.userId){
      this.jobuserService.getApplicationsByUserId(this.userId).subscribe({
        next: (response) => {
          if(response.isSuccess && response.result.length > 0){
            this.isApplicationVisible = true;
            this.applications = response.result;
          }
        }
      });
    }
  }
}
