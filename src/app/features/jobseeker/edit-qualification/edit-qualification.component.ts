import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { QualificationRequest } from '../models/qualification-request.model';
import { JobuserService } from '../services/jobuser.service';

@Component({
  selector: 'app-edit-qualification',
  templateUrl: './edit-qualification.component.html',
  styleUrls: ['./edit-qualification.component.css']
})
export class EditQualificationComponent {
  model: QualificationRequest;
  id: string | null = null;
  userId: string | null = null;
  error: string = '';

  editQualificationSubscription$?: Subscription;

  constructor(private jobuserService: JobuserService, private router: Router, private route: ActivatedRoute){
    this.model = {
      userId: '',
      qualificationName: '',
      university: '',
      yearsOfCompletion: 0,
      gradeOrScore: ''
    }
  }
 
  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');     
      }
    });

    if(this.id && this.userId){
      this.model.userId = this.userId;
      this.jobuserService.getQualificationById(this.id).subscribe({
        next: (response) =>{
          this.model = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onFormSubmit(){
    if(this.model.qualificationName == '' || this.model.university == '' || this.model.yearsOfCompletion == 0 || this.model.gradeOrScore == ''){
        this.error = 'Enter All the details'
    }
    else{
      if(this.id){
        this.editQualificationSubscription$ = this.jobuserService.editQualification(this.model, this.id).subscribe({
          next: (response) =>{
            this.router.navigateByUrl(`/qualification/${this.id}`);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    }
  }

  onDelete(){
    if(this.id){
      this.jobuserService.deleteQualification(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl(`/qualification/${this.id}`);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.editQualificationSubscription$?.unsubscribe();
  }
}
