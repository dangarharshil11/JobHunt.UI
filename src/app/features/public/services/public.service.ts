import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { VacancyResponse } from '../models/vacancy-response.model';
import { Organization } from '../models/organization.model';

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
}
