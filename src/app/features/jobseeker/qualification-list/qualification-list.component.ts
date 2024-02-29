import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Qualification } from '../models/qualification.model';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent implements OnInit {
  userId: string | null = null;
  qualifications$?: Observable<Qualification[]>;

  constructor(private jobuserService: JobuserService){}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    if(this.userId){
      this.qualifications$ = this.jobuserService.getAllQualifications(this.userId);
    }
  }
}
