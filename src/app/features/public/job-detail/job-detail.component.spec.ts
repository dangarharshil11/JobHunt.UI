import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed,  fakeAsync,  flush,  waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VacancyResponse } from '../models/vacancy-response.model';
import { PublicService } from '../services/public.service';
import { Response } from '../models/response-model';
import { AppModule } from 'src/app/app.module';
import { JobDetailComponent } from './job-detail.component';
import { Organization } from '../models/organization.model';
import { By } from '@angular/platform-browser';


let response: Response = {
  message : '',
  isSuccess : true,
}

let failResponse: Response = {
  message : '',
  isSuccess : false,
}

const vacancy: VacancyResponse = {
  "id": "61edda4f-ebdd-42f9-ed13-08dc39205bd7",
    "publishedBy": "Green Solutions",
    "publishedDate": new Date("2024-02-29T12:20:18.532"),
    "noOfVacancies": 2,
    "minimumQualification": "BE in Civil",
    "jobTitle": "Site Manager",
    "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
    "experienceRequired": "3 to 5 years",
    "lastDate": new Date("2024-03-08T00:00:00"),
    "minimumSalary": 30000,
    "maximumSalary": 50000,
    "applied": false
}

const profile: Organization = {
  "organization": "Green Solutions",
  "organizationType": "Agriculture",
  "companyEmail": "info@greensolutions.com",
  "companyPhone": "9988776655",
  "noOfEmployees": 100,
  "startYear": 2020,
  "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
  "createdBy": "demoemployer@email.com",
  "imageUrl": "https://localhost:7284/Images/2d967414-5688-4dc0-a23a-dbf7880b19d6.jpg"
} 

const vacancyResponse: Response = { 
  message: '',
  isSuccess: true,
  result: vacancy
};

const profileResponse: Response = { 
  message: '',
  isSuccess: true,
  result: profile
};

describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;
  let publicService: any;
  let el: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    const publicServiceSpy = jasmine.createSpyObj('PublicService', ['getVacancyById', 'getProfileByName', 'getUserDetails', 'apply']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppModule
      ],
      providers: [
        { provide: PublicService, useValue: publicServiceSpy },
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(JobDetailComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      httpTestingController = TestBed.inject(HttpTestingController)
      publicService = TestBed.inject<PublicService>(PublicService);

      
      spyOn(localStorage, 'getItem').and.callFake((key: string) => {
        if (key === 'user-id') return 'userId123';
        if (key === 'user-roles') return 'JobSeeker';
        return null;
      });

      fixture.detectChanges();
    });
  }));
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should fetch on ngOnInit', () => { 
    pending()    
  });

  it('should apply on Submit', () => {
    component.userRoles = ['JobSeeker'];
    publicService.getUserDetails.and.returnValue(of(response));
    publicService.apply.and.returnValue(of(response));

    const showSpy = spyOn(component, 'show').and.callThrough();

    component.onApply();

    expect(showSpy).toHaveBeenCalledWith('Applied Successfully!');
  })

  it('should give error if role is not jobseeker', () => {
    component.userRoles = ['Employer'];
    
    const errorSpy = spyOn(component, 'error').and.callThrough();

    component.onApply();

    expect(errorSpy).toHaveBeenCalledWith('You Must Login as a JobSeeker to apply for any vacancy');
  });

  it('should give error if user has not added profile', () => {
    component.userRoles = ['JobSeeker'];
    publicService.getUserDetails.and.returnValue(of(failResponse));
    
    const errorSpy = spyOn(component, 'error').and.callThrough();

    component.onApply();

    expect(errorSpy).toHaveBeenCalledWith('Please Add your Profile Before Applying');
  });

  it('should display vacancy details', () => {
    pending();
  });

  it('should display organization profile', () => {
    pending();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});