import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Qualification } from '../models/qualification.model';
import { Organization } from '../../employer/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class JobuserService {

  constructor(private http: HttpClient) { }

  getProfile(email: string): Observable<User>{
    return this.http.get<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/getByEmail/${email}`);
  }

  addProfile(request: User): Observable<User>{
    return this.http.post<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/addProfile`,request);
  }

  editProfile(request: User, email: string): Observable<User>{
    return this.http.put<User>(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/updateProfile/${email}`, request)
  } 

  getAllQualifications(userId: string): Observable<Qualification[]>{
    return this.http.get<Qualification[]>(`${environment.jobseekerapiBaseUrl}/api/qualification/GetAllQualificationsByUserId/${userId}`);
  }
}
