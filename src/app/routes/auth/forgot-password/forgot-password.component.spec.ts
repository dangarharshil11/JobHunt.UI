import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthModuleModule } from '../auth-module.module';
import { AuthService } from '../services/auth.service';

describe('FrogotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: any;
  let el: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['forgotpassword']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AuthModuleModule,
        RouterTestingModule
      ],
      providers: [
        MessageService,
        { provide: AuthService, useValue: authServiceSpy },
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ForgotPasswordComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      httpTestingController = TestBed.inject(HttpTestingController)
      authService = TestBed.inject<AuthService>(AuthService);

      fixture.detectChanges();
    });
  }));
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize form with empty fields', () => {
    expect(component.forgotPasswordForm.value).toEqual({ email: '', password: '' });
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });
  
  it('should have valid form when all fields are filled correctly', () => {
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com',
      password: 'password'
    });

    expect(component.forgotPasswordForm.valid).toBeTruthy();
  });
  
  it('should have invalid form if any field is left empty', () => {
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com',
      password: ''
    });

    expect(component.forgotPasswordForm.valid).toBeFalsy();

    component.forgotPasswordForm.patchValue({
      email: '',
      password: 'password'
    });
    
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });
  
  it('should call forgotpassword method when form is valid', () => {
    authService.forgotpassword.and.returnValue(of({ isSuccess: true, message: 'Password Reset Successfull' }));
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com',
      password: 'password'
    });
    const showSpy = spyOn(component, 'show').and.callThrough();
    
    component.onSubmit();

    expect(showSpy).toHaveBeenCalledWith();
    expect(authService.forgotpassword).toHaveBeenCalled();
  });
  
  it('should not call forgotpassword method when form is invalid', () => {
    authService.forgotpassword.and.returnValue(of({ isSuccess: true, message: 'Password Reset Successfull' }));

    component.onSubmit();

    expect(authService.forgotpassword).not.toHaveBeenCalled();
  });
  
  it('should display error message if password reset fails', () => {
    authService.forgotpassword.and.returnValue(of({ isSuccess: false, message: 'Password reset failed' }));
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com',
      password: 'password'
    });
    const errorSpy = spyOn(component, 'showerror').and.callThrough();
    
    component.onSubmit();

    expect(errorSpy).toHaveBeenCalledWith();
  });
  
  it('should navigate to login page if password reset is successful', () => {
    authService.forgotpassword.and.returnValue(of({ isSuccess: true, message: 'Password Reset Successfull' }));
    component.forgotPasswordForm.patchValue({
      email: 'test@example.com',
      password: 'password'
    });
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

    component.onSubmit();
    
    expect(routerSpy).toHaveBeenCalledWith('/auth/login');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
