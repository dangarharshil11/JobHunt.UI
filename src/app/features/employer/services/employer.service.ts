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

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  getprofile(email: string): Observable<Organization>{
    return this.http.get<Organization>(`${environment.employerapiBaseUrl}/api/company/${email}`);
  }

  createProfile(request: Organization): Observable<Organization>{
    return this.http.post<Organization>(`${environment.employerapiBaseUrl}/api/company/addDetails?addAuth=true`,request);
  }

  updateProfile(request: Organization): Observable<Organization>{
    return this.http.put<Organization>(`${environment.employerapiBaseUrl}/api/company/updateDetails/${request.createdBy}?addAuth=true`,request);
  }

  getVacancyByName(name: string): Observable<VacancyResponse[]>{
    return this.http.get<VacancyResponse[]>(`${environment.employerapiBaseUrl}/api/vacancy/getByCompany/${name}`);
  }

  getVacancyById(id: string): Observable<VacancyResponse>{
    return this.http.get<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/${id}`);
  }

  createVacancy(request: VacancyRequest): Observable<VacancyResponse>{
    return this.http.post<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/addVacancy?addAuth=true`, request);
  }

  updateVacancy(request: VacancyRequest, id: string): Observable<VacancyResponse>{
    return this.http.put<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/updateVacancy/${id}?addAuth=true`, request);
  }

  deleteVacancy(id: string) :Observable<VacancyResponse>{
    return this.http.delete<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/deleteVacancy/${id}?addAuth=true`);
  }

  getApplicationsByVacancyId(id: string): Observable<ApplicationResponse[]>{
    return this.http.get<ApplicationResponse[]>(`${environment.employerapiBaseUrl}/api/application/getAllByVacancy/${id}?addAuth=true`);
  }

  getCandidateProfile(userId: string): Observable<User>{
    return this.http.get<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/getByUserId/${userId}?addAuth=true`);
  }

  getAllQualifications(userId: string): Observable<QualificationResponse[]>{
    return this.http.get<QualificationResponse[]>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetAllQualificationsByUserId/${userId}?addAuth=true`);
  }
  
  getAllExperiences(userId: string): Observable<ExperienceResponse[]>{
    return this.http.get<ExperienceResponse[]>(`${environment.jobseekerapiBaseUrl}/api/experience/getAllExperiencesByUserId/${userId}?addAuth=true`);
  }
}
