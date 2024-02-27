import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Organization } from '../models/organization.model';
import { environment } from 'src/environments/environment';
import { Vacancy } from '../models/vacancy.model';

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

  getVacancyByName(name: string): Observable<Vacancy[]>{
    return this.http.get<Vacancy[]>(`${environment.employerapiBaseUrl}/api/vacancy/getByCompany/${name}`);
  }

  createVacancy(request: Vacancy): Observable<Vacancy>{
    return this.http.post<Vacancy>(`${environment.employerapiBaseUrl}/api/vacancy/addVacancy`, request);
  }
}
