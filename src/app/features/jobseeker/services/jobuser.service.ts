import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { QualificationRequest } from '../models/qualification-request.model';
import { QualificationResponse } from '../models/qualification-response.model';
import { ExperienceResponse } from '../models/experience-response.model';

@Injectable({
  providedIn: 'root'
})
export class JobuserService {

  constructor(private http: HttpClient) { }

  getProfile(email: string): Observable<User>{
    return this.http.get<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/getByEmail/${email}`);
  }

  addProfile(request: User): Observable<User>{
    return this.http.post<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/addProfile`,request);
  }

  editProfile(request: User, email: string): Observable<User>{
    return this.http.put<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/updateProfile/${email}`, request)
  } 

  getAllQualifications(userId: string): Observable<QualificationResponse[]>{
    return this.http.get<QualificationResponse[]>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetAllQualificationsByUserId/${userId}`);
  }

  getQualificationById(id: string): Observable<QualificationResponse>{
    return this.http.get<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetQualificationById/${id}`);
  }

  addQualification(request: QualificationRequest): Observable<QualificationResponse>{
    return this.http.post<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/addQualification`, request)
  }

  editQualification(request: QualificationRequest, id: string): Observable<QualificationResponse>{
    return this.http.put<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/updateQualification/${id}`,request);
  }

  deleteQualification(id: string): Observable<QualificationResponse>{
    return this.http.delete<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/deleteQualification/${id}`);
  }

  getAllExperiences(userId: string): Observable<ExperienceResponse[]>{
    return this.http.get<ExperienceResponse[]>(`${environment.jobseekerapiBaseUrl}/api/experience/getAllExperiencesByUserId/${userId}`);
  }
}
