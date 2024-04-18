import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthModuleModule } from '../auth-module.module';
import { AuthService } from '../services/auth.service';
import { Response } from '../models/response-model';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: any;
  let el: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

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
      fixture = TestBed.createComponent(RegisterComponent);
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

  it('should initialize form with empty fields and have invalid form initially', () => {
    expect(component.registerForm.value).toEqual({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      selectedRole: ''
    });
    expect(component.registerForm.valid).toBeFalsy();
  });
  
  it('should have valid form when all fields are filled correctly', () => {
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      password: 'password',
      selectedRole: 'JobSeeker'
    });

    expect(component.registerForm.valid).toBeTruthy();
  });
  
  it('should have invalid form if any field is left empty', () => {
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: '',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      password: 'password',
      selectedRole: 'JobSeeker'
    });

    expect(component.registerForm.valid).toBeFalsy();
  });
    
  it('should have invalid form if password is too short', () => {
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      password: 'pass',
      selectedRole: 'JobSeeker'
    });

    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should not call register method when form is invalid', () => {
    component.onFormSubmit();
    
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.registerForm.valid).toBeFalsy();
  });
  
  it('should call register method when form is valid', () => {
    authService.register.and.returnValue(of({ isSuccess: true, message: 'User Registration Successful' }));
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      password: 'password',
      selectedRole: 'JobSeeker'
    });

    const showSpy = spyOn(component, 'show').and.callThrough();
    
    component.onFormSubmit();

    expect(showSpy).toHaveBeenCalledWith();
    expect(authService.register).toHaveBeenCalled();
  });
  
  it('should display error message if registration fails', () => {
    authService.register.and.returnValue(of({isSuccess: false, message: 'Registration Failed'} as Response));
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      password: 'password',
      selectedRole: 'JobSeeker'
    });
    const errorSpy = spyOn(component, 'showError').and.callThrough();

    component.onFormSubmit();

    expect(errorSpy).toHaveBeenCalledWith('Registration Failed');
  });
  
  it('should navigate to login page if registration is successful', () => {
    authService.register.and.returnValue(of({ isSuccess: true, message: 'User Registration Successful' }));
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      password: 'password',
      selectedRole: 'JobSeeker'
    });

    const showSpy = spyOn(component, 'show').and.callThrough();
    
    component.onFormSubmit();

    expect(showSpy).toHaveBeenCalledWith();
    expect(routerSpy).toHaveBeenCalledWith('/auth/login');
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });
});
