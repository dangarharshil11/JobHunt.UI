import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Organization } from '../models/organization.model';
import { environment } from 'src/environments/environment';
import { VacancyRequest } from '../models/vacancy-request.model';
import { VacancyResponse } from '../models/vacancy-response.model';
import { ApplicationResponse } from '../models/application-response.model';
import { QualificationResponse } from '../models/qualification-response.model';
import { ExperienceResponse } from '../models/experience-response.model';
import { User } from '../models/user.model';
import { Response } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  getprofile(email: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/company/${email}`);
  }

  createProfile(request: Organization): Observable<Response>{
    return this.http.post<Response>(`${environment.employerapiBaseUrl}/api/company/addDetails?addAuth=true`,request);
  }

  updateProfile(request: Organization): Observable<Response>{
    return this.http.put<Response>(`${environment.employerapiBaseUrl}/api/company/updateDetails/${request.createdBy}?addAuth=true`,request);
  }

  getVacancyByName(name: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/vacancy/getByCompany/${name}`);
  }

  getVacancyById(id: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/${id}`);
  }

  createVacancy(request: VacancyRequest): Observable<Response>{
    return this.http.post<Response>(`${environment.employerapiBaseUrl}/api/vacancy/addVacancy?addAuth=true`, request);
  }

  updateVacancy(request: VacancyRequest, id: string): Observable<Response>{
    return this.http.put<Response>(`${environment.employerapiBaseUrl}/api/vacancy/updateVacancy/${id}?addAuth=true`, request);
  }

  deleteVacancy(id: string) :Observable<Response>{
    return this.http.delete<Response>(`${environment.employerapiBaseUrl}/api/vacancy/deleteVacancy/${id}?addAuth=true`);
  }

  getApplicationsByVacancyId(id: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/application/getAllByVacancy/${id}?addAuth=true`);
  }

  getCandidateProfile(userId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/getByUserId/${userId}?addAuth=true`);
  }

  getAllQualifications(userId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetAllQualificationsByUserId/${userId}?addAuth=true`);
  }
  
  getAllExperiences(userId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.jobseekerapiBaseUrl}/api/experience/getAllExperiencesByUserId/${userId}?addAuth=true`);
  }
}
