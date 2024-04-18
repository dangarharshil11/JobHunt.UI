import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router, private toasterService: ToasterService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Protecting Employer Routes
    if(this.router.url.startsWith('/profile') || this.router.url.startsWith('/vacancy')){
      if(!localStorage.getItem('user-roles')?.includes('Employer')){
        this.toasterService.showError('UnAuthorized');
        this.router.navigateByUrl('');
      }
    }
    // Protecting JobSeeker Routes
    else if(this.router.url.startsWith('/user') || this.router.url.startsWith('/experience') || this.router.url.startsWith('/qualification')){
      if(!localStorage.getItem('user-roles')?.includes('JobSeeker')){
        this.toasterService.showError('UnAuthorized');
        this.router.navigateByUrl('');
      }    
    }

    // Checks if Authorization Headers should be set or not
    if (this.shouldIntercept(request)) {
      const authRequest = request.clone({
        setHeaders: {
          'Authorization': this.cookieService.get('Authorization')
        }
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private shouldIntercept(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('addAuth=true', 0) > -1 ? true : false;
  }
}
