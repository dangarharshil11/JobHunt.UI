import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Response } from '../models/response-model';
import { RegisterRequest } from '../models/register-request.model';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { User } from '../models/user.model';

let registertFailure: Response = {
  isSuccess: false,
  message: "User with this email already exist. Please Login"
}

let registerSuccess: Response = {
  "isSuccess": true,
  "message": "User Registration Successful"
}

let loginRequest: LoginRequest = {
  email: "demouser@email.com",
  password: "User@123"
}

let loginSuccess: Response = {
  result: {
    "userId": "dfb764c1-0dea-45a0-b04f-e138c0e08c22",
    "fullName": "First Last",
    "email": "demouser@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJkZW1vdXNlckBlbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRmlyc3QgTGFzdCIsIklkIjoiZGZiNzY0YzEtMGRlYS00NWEwLWIwNGYtZTEzOGMwZTA4YzIyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiSm9iU2Vla2VyIiwiZXhwIjoxNzEyMDczNjM4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTk1IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCJ9.gQTKSgTvwpUmCF-X-4JLezqnGaFGiH4orSlSsKNcHy8",
    "roles": [
      "JobSeeker"
    ]
  },
  isSuccess: true,
  message: "Login Successful"
}

let invalidLoginResponse: Response = {
  isSuccess: false,
  message: "Invalid Login Credentials"
}

let loginFailure: Response = {
  isSuccess: false,
  message: "User Does Not Exists. Please Register"
}

let registerRequest: RegisterRequest = {
  firstName: "Kakashi",
  lastName: "Hatake",
  email: "kakashithecopyninja@leaf.com",
  phoneNumber: "9876543210",
  password: "Employer@123",
  role: "Employer"
}

let forgotpasswordResponse: Response = {
  "isSuccess": true,
  "message": "Password Reset Successfull"
}

const user: User = {
  userId: '123',
  fullName: 'John Doe',
  email: 'john@example.com',
  roles: ['JobSeeker']
};

describe('AuthService', () => {
  let authService: AuthService,
        httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AuthService
        ]
    });
    
    authService = TestBed.inject(AuthService)
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it("should return error when already registered user register again", () => {
    authService.register(registerRequest).subscribe(
      response => {
          expect(response.isSuccess).toBeTrue();
          expect(response.message).toEqual("User Registration Successful");
      });
  
    const req = httpTestingController.expectOne(`${environment.authapiBaseUrl}/api/auth/register`);
    expect(req.request.method).toEqual("POST");

    req.flush(registerSuccess);
  });

  it("should return success when no existing user registers", () => {
    authService.register(registerRequest).subscribe(
      response => {
          expect(response.isSuccess).toBeFalse();
          expect(response.message).toEqual("User with this email already exist. Please Login");
      });
  
    const req = httpTestingController.expectOne(`${environment.authapiBaseUrl}/api/auth/register`);
    expect(req.request.method).toEqual("POST");
      
    req.flush(registertFailure);
  });

  it("should success with correct credentials", () => {
    authService.login(loginRequest).subscribe(
      response => {
          expect(response.isSuccess).toBeTrue();
          expect(response.message).toEqual("Login Successful");

          expect(response.result?.token).toBeTruthy();
          expect(response.result?.roles[0]).toEqual('JobSeeker');
      });
  
    const req = httpTestingController.expectOne(`${environment.authapiBaseUrl}/api/auth/login`);
    expect(req.request.method).toEqual("POST");
      
    req.flush(loginSuccess);
  });

  it("should return failure with Incorrect credentials", () => {
    authService.login(loginRequest).subscribe(
      response => {
          expect(response.isSuccess).toBeFalse();
          expect(response.message).toEqual("Invalid Login Credentials");
      });
  
    const req = httpTestingController.expectOne(`${environment.authapiBaseUrl}/api/auth/login`);
    expect(req.request.method).toEqual("POST");
      
    req.flush(invalidLoginResponse);
  });

  it("should return failure when user is not registered", () => {
    authService.login(loginRequest).subscribe(
      response => {
          expect(response.isSuccess).toBeFalse();
          expect(response.message).toEqual("User Does Not Exists. Please Register");
      });
  
    const req = httpTestingController.expectOne(`${environment.authapiBaseUrl}/api/auth/login`);
    expect(req.request.method).toEqual("POST");
      
    req.flush(loginFailure);
  });

  it("should return success when user exists", () => {
    authService.forgotpassword(loginRequest).subscribe(
      response => {
          expect(response.isSuccess).toBeTrue();
          expect(response.message).toEqual("Password Reset Successfull");
      });
  
    const req = httpTestingController.expectOne(`${environment.authapiBaseUrl}/api/auth/forgotpassword`);
    expect(req.request.method).toEqual("POST");
      
    req.flush(forgotpasswordResponse);
  });

  it("should return failure when user is not registered", () => {
    authService.forgotpassword(loginRequest).subscribe(
      response => {
          expect(response.isSuccess).toBeFalse();
          expect(response.message).toEqual("User Does Not Exists. Please Register");
      });
  
    const req = httpTestingController.expectOne(`${environment.authapiBaseUrl}/api/auth/forgotpassword`);
    expect(req.request.method).toEqual("POST");
      
    req.flush(loginFailure);
  });

  it('should set user and store in local storage', () => {
    authService.setUser(user);

    expect(localStorage.getItem('user-id')).toBe(user.userId);
    expect(localStorage.getItem('user-name')).toBe(user.fullName);
    expect(localStorage.getItem('user-email')).toBe(user.email);
    expect(localStorage.getItem('user-roles')).toBe(user.roles.join(','));
  });

  it('should return user from local storage', () => {
    localStorage.setItem('user-id', user.userId);
    localStorage.setItem('user-name', user.fullName);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));

    const retrievedUser = authService.getUser();

    expect(retrievedUser).toEqual(user);
  });

  it('should return undefined if user is not in local storage', () => {
    authService.logout();
    const retrievedUser = authService.getUser();

    expect(retrievedUser).toBeUndefined();
  });

  it('should logout user and clear local storage', () => {
    localStorage.setItem('user-id', '123');
    localStorage.setItem('user-name', 'John Doe');
    localStorage.setItem('user-email', 'john@example.com');
    localStorage.setItem('user-roles', 'user');

    authService.logout();

    expect(localStorage.getItem('user-id')).toBeNull();
    expect(localStorage.getItem('user-name')).toBeNull();
    expect(localStorage.getItem('user-email')).toBeNull();
    expect(localStorage.getItem('user-roles')).toBeNull();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
