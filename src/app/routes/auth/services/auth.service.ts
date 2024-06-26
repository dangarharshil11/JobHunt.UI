import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { LoginRequest } from '../models/login-request.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { RegisterRequest } from '../models/register-request.model';
import { Response } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  register(request: RegisterRequest): Observable<Response>{
    return this.http.post<Response>(`${environment.authapiBaseUrl}/api/auth/register`,request);
  }

  login(request: LoginRequest): Observable<Response>{
    return this.http.post<Response>(`${environment.authapiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password,
    });
  }

  forgotpassword(request: LoginRequest): Observable<Response>{
    return this.http.post<Response>(`${environment.authapiBaseUrl}/api/auth/forgotpassword`, request);
  }

  // Storing user-data to localStorage
  setUser(user: User): void{
    this.$user.next(user);
    localStorage.setItem('user-id',user.userId);
    localStorage.setItem('user-name',user.fullName);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));
  }

  // Retrieving user-data from localStorage
  getUser(): User | undefined{
    const userId = localStorage.getItem('user-id');
    const fullName = localStorage.getItem('user-name');
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if(email && roles && userId && fullName){
      const user: User = {
        userId: userId,
        fullName: fullName,
        email: email,
        roles: roles?.split(','),
      }
      return user;
    }
    return undefined;
  } 

  user(): Observable<User | undefined>{
    return this.$user.asObservable();
  }

  // Clearnig User-data from cookie and localStorage on logout
  logout(): void{
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
