import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthModuleModule } from '../auth-module.module';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../models/login-response.model';
import { Response } from '../models/response-model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: any;
  let cookieService: CookieService;
  let el: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setUser']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AuthModuleModule,
        RouterTestingModule
      ],
      providers: [
        CookieService,
        MessageService,
        { provide: AuthService, useValue: authServiceSpy },
        
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      httpTestingController = TestBed.inject(HttpTestingController)
      authService = TestBed.inject<AuthService>(AuthService);
      cookieService = TestBed.inject(CookieService);  

      fixture.detectChanges();
    });
  }));
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields and login button should be disabled', () => {
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(loginButton.disabled).toBeTrue();
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should handle form submission with email and password', () => {
    const email = 'test@example.com';
    const password = 'password123';
    authService.login.and.returnValue(of({ isSuccess: true, result: { userId: '123', fullName: 'Jhon Doe', email: 'jhon@email.com', token: 'dummytoken', roles: ['JobSeeker']} as LoginResponse }));
    component.loginForm.patchValue({ email, password });
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    
    component.onFormSubmit();
    fixture.detectChanges();

    expect(loginButton.disabled).toBeFalse();
    expect(authService.login).toHaveBeenCalledWith({ email, password });
  });

  it('should show error message when login fails', () => {
    authService.login.and.returnValue(of({ message: 'Login Failed', isSuccess: false }));
    const errorSpy = spyOn(component, 'showerror').and.callThrough();

    component.onFormSubmit();
    
    expect(errorSpy).toHaveBeenCalledWith('Login Failed');
  });

  it('should set user data and redirect to home page upon successful login', () => {
    const mockResponse: Response = { message: 'Login Successful', isSuccess: true, result: { token: 'mockToken', userId: '123', fullName: 'John Doe', email: 'john@example.com', roles: ['user'] } };
    authService.login.and.returnValue(of(mockResponse));

    component.onFormSubmit();

    expect(authService.setUser).toHaveBeenCalledWith({
      userId: '123',
      fullName: 'John Doe',
      email: 'john@example.com',
      roles: ['user']
    });
  });

  it('should set Authorization cookie upon successful login', () => {
    const mockResponse: Response = { message: 'Login Successful', isSuccess: true, result: { token: 'mockToken', userId: '123', fullName: 'John Doe', email: 'john@example.com', roles: ['user'] } };
    authService.login.and.returnValue(of(mockResponse));

    component.onFormSubmit();

    expect(cookieService.get('Authorization')).toEqual('Bearer mockToken');
  });

  it('should navigate to home page upon successful login', () => {
    const mockResponse: Response = { message: 'Login Successful', isSuccess: true, result: { token: 'mockToken', userId: '123', fullName: 'John Doe', email: 'john@example.com', roles: ['user'] } };
    authService.login.and.returnValue(of(mockResponse));
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
  
    component.onFormSubmit();
  
    expect(routerSpy).toHaveBeenCalledWith('/');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
