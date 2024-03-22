import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.router.url.startsWith('/profile') || this.router.url.startsWith('/vacancy')){
      if(!localStorage.getItem('user-roles')?.includes('Employer')){
        this.showError('UnAuthorized');
        this.router.navigateByUrl('');
      }
    }
    else if(this.router.url.startsWith('/user') || this.router.url.startsWith('/experience') || this.router.url.startsWith('/qualification')){
      if(!localStorage.getItem('user-roles')?.includes('JobSeeker')){
        this.showError('UnAuthorized');
        this.router.navigateByUrl('');
      }    
    }
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

  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
