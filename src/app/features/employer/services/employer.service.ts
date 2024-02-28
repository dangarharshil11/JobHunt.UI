import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Organization } from '../models/organization.model';
import { environment } from 'src/environments/environment';
import { VacancyRequest } from '../models/vacancy-request.model';
import { VacancyResponse } from '../models/vacancy-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  getprofile(email: string): Observable<Organization>{
    return this.http.get<Organization>(`${environment.employerapiBaseUrl}/api/company/${email}`);
  }

  createProfile(request: Organization): Observable<Organization>{
    return this.http.post<Organization>(`${environment.employerapiBaseUrl}/api/company/addDetails`,request);
  }

  updateProfile(request: Organization): Observable<Organization>{
    return this.http.put<Organization>(`${environment.employerapiBaseUrl}/api/company/updateDetails/${request.createdBy}`,request);
  }

  getVacancyByName(name: string): Observable<VacancyResponse[]>{
    return this.http.get<VacancyResponse[]>(`${environment.employerapiBaseUrl}/api/vacancy/getByCompany/${name}`);
  }

  getVacancyById(id: string): Observable<VacancyResponse>{
    return this.http.get<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/${id}`);
  }

  createVacancy(request: VacancyRequest): Observable<VacancyResponse>{
    return this.http.post<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/addVacancy`, request);
  }

  updateVacancy(request: VacancyRequest, id: string): Observable<VacancyResponse>{
    return this.http.put<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/updateVacancy/${id}`, request);
  }

  deleteVacancy(id: string) :Observable<VacancyResponse>{
    return this.http.delete<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/deleteVacancy/${id}`);
  }
}
