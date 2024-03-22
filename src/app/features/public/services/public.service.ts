import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApplicationRequest } from '../models/application-request.model';
import { Response } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  getAllVacancies(): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/vacancy/getAllVacancies`);
  }

  getVacancyById(id: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/${id}?addAuth=true`);
  }

  getProfileByName(name: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/company/getProfileByName/${name}`);
  }

  apply(request: ApplicationRequest): Observable<Response>{
    return this.http.post<Response>(`${environment.employerapiBaseUrl}/api/application/createApplication?addAuth=true`,request);
  }

  getUserDetails(userId: string): Observable<Response>{
    return this.http.get<Response>(`${environment.employerapiBaseUrl}/api/jobSeeker/getByUserId/${userId}?addAuth=true`);
  }
}
