import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { QualificationRequest } from '../models/qualification-request.model';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.css']
})
export class AddQualificationComponent implements OnInit, OnDestroy {
  model: QualificationRequest;
  id: string | null = null;
  error: string = '';

  addQualificationSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router){
    this.model = {
      userId: '',
      qualificationName: '',
      university: '',
      yearsOfCompletion: 0,
      gradeOrScore: ''
    }
  }
 
  ngOnInit(): void {
    this.id = localStorage.getItem('user-id');
    if(this.id){
      this.model.userId = this.id;
    }
  }

  onFormSubmit(){
    console.log(this.model);
    if(this.model.qualificationName == '' || this.model.university == '' || this.model.yearsOfCompletion == 0 || this.model.gradeOrScore == ''){
        this.error = 'Enter All the details'
    }
    else{
      this.addQualificationSubscription$ = this.jobuserService.addQualification(this.model).subscribe({
        next: (response) =>{
          this.router.navigateByUrl(`/qualification/${this.id}`);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.addQualificationSubscription$?.unsubscribe();
  }
}
