import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { QualificationRequest } from '../models/qualification-request.model';
import { ExperienceRequest } from '../models/experience-request.model';
import { Response } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class JobuserService {

  constructor(private http: HttpClient) { }

  getProfile(email: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/getByEmail/${email}?addAuth=true`);
  }

  addProfile(request: User): Observable<Response>{
    return this.http.post<Response>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/profile?addAuth=true`,request);
  }

  uploadImage(file: File, fileName: string): Observable<Response>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName)

    return this.http.post<Response>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/uploadImage?addAuth=true`, formData);
  }

  uploadResume(file: File, fileName: string): Observable<Response>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName)

    return this.http.post<Response>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/uploadResume?addAuth=true`, formData);
  }

  editProfile(request: User): Observable<Response>{
    return this.http.put<Response>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/profile?addAuth=true`, request)
  } 

  getAllQualifications(userId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetAllQualificationsByUserId/${userId}?addAuth=true`);
  }

  getQualificationById(id: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetQualificationById/${id}?addAuth=true`);
  }

  addQualification(request: QualificationRequest): Observable<Response>{
    return this.http.post<Response>(`${environment.jobseekerapiBaseUrl}/api/qualification/addQualification?addAuth=true`, request)
  }

  editQualification(request: QualificationRequest, id: string): Observable<Response>{
    return this.http.put<Response>(`${environment.jobseekerapiBaseUrl}/api/qualification/qualification/${id}?addAuth=true`,request);
  }

  deleteQualification(id: string): Observable<Response>{
    return this.http.delete<Response>(`${environment.jobseekerapiBaseUrl}/api/qualification/qualification/${id}?addAuth=true`);
  }

  getAllExperiences(userId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/experience/getAllExperiencesByUserId/${userId}?addAuth=true`);
  }

  getExperienceById(id: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/experience/getExperienceById/${id}?addAuth=true`);
  }

  addExperience(request: ExperienceRequest): Observable<Response>{
    return this.http.post<Response>(`${environment.jobseekerapiBaseUrl}/api/experience/addExperience?addAuth=true`,request)
  }

  editExperience(request: ExperienceRequest, id: string): Observable<Response>{
    return this.http.put<Response>(`${environment.jobseekerapiBaseUrl}/api/experience/experience/${id}?addAuth=true`,request)
  }

  deleteExperience(id: string): Observable<Response>{
    return this.http.delete<Response>(`${environment.jobseekerapiBaseUrl}/api/experience/experience/${id}?addAuth=true`);
  }

  getApplicationsByUserId(userId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/application/getAllByUser/${userId}?addAuth=true`);
  }
}
