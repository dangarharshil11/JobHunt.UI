import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const user = authService.getUser();

  let token = cookieService.get('Authorization');

  if(token && user){
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if(expDate < currentTime){
      authService.logout();
      showerror(messageService, "Session Expired, Pleaase Login Again")
      return router.createUrlTree(['/auth/login'], { queryParams: {returnUrl: state.url} });
    }
    else{
      if(user.roles.includes("Employer") || user.roles.includes("JobSeeker")){
        return true;
      }
      showerror(messageService, "UnAuthorized User, You do not have access to this page");
      return false;
    }
  }
  else{
    authService.logout();
    showerror(messageService, "Please Login");
    return router.createUrlTree(['/auth/login'], { queryParams: {returnUrl: state.url} });
  }

};
function showerror(messageService: MessageService, msg: string) {
  messageService.add({ severity: 'error', summary: 'Error', detail: msg });
}

