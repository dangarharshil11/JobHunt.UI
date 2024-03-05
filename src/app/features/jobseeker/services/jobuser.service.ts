import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { QualificationRequest } from '../models/qualification-request.model';
import { QualificationResponse } from '../models/qualification-response.model';
import { ExperienceResponse } from '../models/experience-response.model';
import { ExperienceRequest } from '../models/experience-request.model';
import { ApplicationResponse } from '../models/application-response.model';

@Injectable({
  providedIn: 'root'
})
export class JobuserService {

  constructor(private http: HttpClient) { }

  getProfile(email: string): Observable<User>{
    return this.http.get<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/getByEmail/${email}?addAuth=true`);
  }

  addProfile(request: User): Observable<User>{
    return this.http.post<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/addProfile?addAuth=true`,request);
  }

  editProfile(request: User, email: string): Observable<User>{
    return this.http.put<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/updateProfile/${email}?addAuth=true`, request)
  } 

  getAllQualifications(userId: string): Observable<QualificationResponse[]>{
    return this.http.get<QualificationResponse[]>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetAllQualificationsByUserId/${userId}?addAuth=true`);
  }

  getQualificationById(id: string): Observable<QualificationResponse>{
    return this.http.get<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetQualificationById/${id}?addAuth=true`);
  }

  addQualification(request: QualificationRequest): Observable<QualificationResponse>{
    return this.http.post<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/addQualification?addAuth=true`, request)
  }

  editQualification(request: QualificationRequest, id: string): Observable<QualificationResponse>{
    return this.http.put<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/updateQualification/${id}?addAuth=true`,request);
  }

  deleteQualification(id: string): Observable<QualificationResponse>{
    return this.http.delete<QualificationResponse>(`${environment.jobseekerapiBaseUrl}/api/qualification/deleteQualification/${id}?addAuth=true`);
  }

  getAllExperiences(userId: string): Observable<ExperienceResponse[]>{
    return this.http.get<ExperienceResponse[]>(`${environment.jobseekerapiBaseUrl}/api/experience/getAllExperiencesByUserId/${userId}?addAuth=true`);
  }

  getExperienceById(id: string): Observable<ExperienceResponse>{
    return this.http.get<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/getExperienceById/${id}?addAuth=true`);
  }

  addExperience(request: ExperienceRequest): Observable<ExperienceResponse>{
    return this.http.post<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/addExperience?addAuth=true`,request)
  }

  editExperience(request: ExperienceRequest, id: string): Observable<ExperienceResponse>{
    return this.http.put<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/updateExperience/${id}?addAuth=true`,request)
  }

  deleteExperience(id: string): Observable<ExperienceResponse>{
    return this.http.delete<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/deleteExperience/${id}?addAuth=true`);
  }

  getApplicationsByUserId(userId: string): Observable<ApplicationResponse[]>{
    return this.http.get<ApplicationResponse[]>(`${environment.employerapiBaseUrl}/api/application/getAllByUser/${userId}?addAuth=true`);
  }
}
