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

  getExperienceById(id: string): Observable<ExperienceResponse>{
    return this.http.get<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/getExperienceById/${id}`);
  }

  addExperience(request: ExperienceRequest): Observable<ExperienceResponse>{
    return this.http.post<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/addExperience`,request)
  }

  editExperience(request: ExperienceRequest, id: string): Observable<ExperienceResponse>{
    return this.http.put<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/updateExperience/${id}`,request)
  }

  deleteExperience(id: string): Observable<ExperienceResponse>{
    return this.http.delete<ExperienceResponse>(`${environment.jobseekerapiBaseUrl}/api/experience/deleteExperience/${id}`);
  }

  getApplicationsByUserId(userId: string): Observable<ApplicationResponse[]>{
    return this.http.get<ApplicationResponse[]>(`${environment.employerapiBaseUrl}/api/application/getAllByUser/${userId}`);
  }
}
