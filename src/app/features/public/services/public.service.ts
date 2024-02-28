import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { VacancyResponse } from '../models/vacancy-response.model';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  getVacancyById(id: string): Observable<VacancyResponse>{
    return this.http.get<VacancyResponse>(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/${id}`);
  }
}
