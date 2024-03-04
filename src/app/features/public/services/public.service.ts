import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { VacancyResponse } from '../models/vacancy-response.model';
import { Organization } from '../models/organization.model';
import { ApplicationRequest } from '../models/application-request.model';
import { ApplicationResponse } from '../models/application-response.model';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  getAllVacancies(): Observable<VacancyResponse[]>{
    return this.http.get<VacancyResponse[]>(`${environment.employerapiBaseUrl}/api/vacancy/getAllVacancies`);
  }

  getVacancyById(id: string): Observable<VacancyResponse>{
    return this.http.get<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/${id}`);
  }

  getProfileByName(name: string): Observable<Organization>{
    return this.http.get<Organization>(`${environment.employerapiBaseUrl}/api/company/getProfileByName/${name}`);
  }

  apply(request: ApplicationRequest): Observable<ApplicationResponse>{
    return this.http.post<ApplicationResponse>(`${environment.employerapiBaseUrl}/api/application/createApplication`,request);
  }
}
