import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.authapiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void{
    this.$user.next(user);
    localStorage.setItem('user-id',user.userId);
    localStorage.setItem('user-name',user.fullName);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));
  }

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

  logout(): void{
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
