import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  getprofile(email: string): Observable<Organization>{
    return this.http.get<Organization>(`${environment.employerapiBaseUrl}/api/company/${email}`);
  }

  createProfile(request: Organization): Observable<Organization>{
    return this.http.post<Organization>(`${environment.employerapiBaseUrl}/api/company/addDetails`,{
      organization: request.organization,
      organizationType: request.organizationType,
      companyEmail: request.companyEmail,
      companyPhone: request.companyPhone,
      noOfEmployees: request.noOfEmployees,
      startYear: request.startYear,
      about: request.about,
      createdBy: request.createdBy,
    });
  }
}
