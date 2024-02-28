import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  getVacancyById(id: string): Observable<Vacancy>{
    return this.http.get<Vacancy>(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/${id}`);
  }
}
