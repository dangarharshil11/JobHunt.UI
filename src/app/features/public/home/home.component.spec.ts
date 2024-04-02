import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { VacancyResponse } from '../models/vacancy-response.model';
import { PublicService } from '../services/public.service';
import { Response } from '../models/response-model';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';

let vacancyListResponse: VacancyResponse[] = [
    {
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
    },
    {
      "id": "674da545-6231-476e-e018-08dc3c4d373a",
      "publishedBy": "Medi Solutions",
      "publishedDate": new Date("2024-03-04T13:14:57.467"),
      "noOfVacancies": 2,
      "minimumQualification": "B. Pharm",
      "jobTitle": "Quality Manager",
      "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porttitor justo. Phasellus at magna eu orci commodo interdum. Cras at aliquet ligula. Aliquam id venenatis tortor, in laoreet arcu. In ultrices tempor purus nec dapibus. Sed accumsan tortor a dui posuere, nec sodales tortor gravida. Proin mollis massa mauris, vel placerat felis congue non.\n\nMauris consectetur risus at justo aliquet, non dictum enim imperdiet. Proin id tellus eget tellus sagittis rhoncus sed quis sem. Quisque a ligula sed nisi lacinia tempus. Phasellus gravida urna ipsum, ut tristique risus mollis a. Nam nibh est, tristique eget est in, tempus tempus nulla. Etiam cursus, mauris nec molestie egestas, magna est sodales libero, sit amet lobortis magna sapien et diam. Aliquam non velit vitae erat sollicitudin placerat non id enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sagittis turpis ac felis convallis, eu bibendum lectus volutpat. Integer nec est orci. Aenean sit amet egestas neque, ut consectetur enim. In est sapien, dictum vitae risus non, sagittis rhoncus est.\n\nSuspendisse nec enim nec tortor laoreet vulputate ac nec tortor. Quisque pulvinar efficitur velit in lacinia. In viverra, lacus et maximus tincidunt, velit velit gravida sem, vitae tristique arcu ipsum eu odio. Phasellus fermentum ornare risus, dignissim maximus elit fermentum et. Suspendisse ultricies ultrices ornare. Curabitur molestie pellentesque orci in scelerisque. Donec vestibulum justo sed laoreet ultricies. Sed molestie sem id dolor suscipit, ut finibus urna mollis. Cras gravida nibh non dapibus hendrerit.",
      "experienceRequired": "3 to 5 years",
      "lastDate": new Date("2024-03-27T00:00:00"),
      "minimumSalary": 37000,
      "maximumSalary": 30000,
      "applied": false
    },
    {
      "id": "3660948d-570c-488b-4458-08dc3ccc67b1",
      "publishedBy": "Green Solutions",
      "publishedDate": new Date("2024-03-05T00:00:00"),
      "noOfVacancies": 5,
      "minimumQualification": "MBA",
      "jobTitle": "Senior Customer Executive",
      "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
      "experienceRequired": "3 to 5 years",
      "lastDate": new Date("2024-03-10T00:00:00"),
      "minimumSalary": 30000,
      "maximumSalary": 25000,
      "applied": false
    },
    {
      "id": "51b1bbe3-14b5-4000-bbe7-08dc3ea06d85",
      "publishedBy": "Medi Solutions",
      "publishedDate": new Date("2024-03-07T12:16:55.351"),
      "noOfVacancies": 5,
      "minimumQualification": "Graduate in any stream",
      "jobTitle": "Marketing Intern",
      "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc massa nisl, cursus eget tempor vitae, porttitor eget nibh. Donec porttitor in velit vitae fermentum. Proin aliquet sapien magna. Sed vitae placerat est. Nam sagittis justo at eleifend consequat. Fusce efficitur, felis non imperdiet vulputate, purus ipsum viverra sem, eu aliquam diam metus vel libero. Proin aliquet id felis nec dignissim. Nulla lacinia ornare metus sit amet accumsan. Curabitur iaculis purus ut aliquet placerat. Nulla condimentum ac elit a tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vehicula nisl eget tellus ultricies vulputate. Phasellus molestie semper luctus.\n\nNunc dictum velit in pellentesque posuere. Etiam nec suscipit magna. Etiam interdum nibh ac tortor varius, in sodales dui pretium. Integer a neque magna. Donec rhoncus velit at tristique porta. Etiam odio massa, fermentum sed sagittis sed, malesuada vel ante. Ut ac nisi quam.\n\nNulla vitae ante sed est consequat dictum. Etiam vitae magna sed augue porta scelerisque. Nam pulvinar ornare urna, eget mattis metus consequat in. Praesent a nisl quis ante tempus dapibus quis eget mi. Vestibulum cursus mauris nibh, tristique rhoncus tortor eleifend eget. Vivamus sagittis lorem a risus volutpat luctus. Morbi mollis lectus at feugiat pellentesque. Vestibulum ac lorem nec quam rutrum sodales id sed est. Praesent vel accumsan tellus, ut facilisis velit.",
      "experienceRequired": "No Experience Required",
      "lastDate": new Date("2024-03-26T18:30:00"),
      "minimumSalary": 15000,
      "maximumSalary": 10000,
      "applied": false
    },
    {
      "id": "cf91f57a-cea8-4af6-58be-08dc4a3dde2d",
      "publishedBy": "Shelby Foundation",
      "publishedDate": new Date("2024-03-22T07:00:51.75"),
      "noOfVacancies": 5,
      "minimumQualification": "Graduate in any stream",
      "jobTitle": "Interns",
      "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit enim. Praesent ut ultrices sem. Vivamus euismod, magna sed dignissim dictum, sem massa fringilla erat, in interdum ligula quam in lectus. Quisque sed leo ut lacus lacinia rutrum at vel odio. Pellentesque finibus tristique purus, at imperdiet lacus sagittis nec. In bibendum enim eu erat feugiat, eu scelerisque erat aliquet. Proin et viverra quam. Nunc aliquet nec nulla non consectetur. Aenean at nisi leo. Cras vehicula, mauris ac porta sodales, ante odio scelerisque leo, et commodo metus lorem eget orci. Integer sed sapien elementum, blandit orci id, finibus ante. Proin pulvinar viverra vestibulum. Nunc quis dolor laoreet magna bibendum tristique at facilisis diam. Nulla molestie eleifend quam, in pretium est pretium eu. Nunc bibendum sed sem lacinia mollis.\n\nFusce pharetra ipsum augue, ac ultrices dolor pretium nec. Morbi vestibulum mollis urna, et pellentesque tellus malesuada dignissim. Vivamus aliquam quam eget dui mattis sodales. Quisque ultrices mi quis turpis venenatis, vel finibus elit bibendum. Nulla porta dolor odio, at maximus ipsum vestibulum vitae. Sed feugiat nec odio sed facilisis. Fusce massa diam, elementum ut varius a, consequat a elit. Aenean lobortis vitae tellus ac posuere. Sed in lorem id est tempus posuere. Cras sed convallis leo. Nullam ultrices ante vitae ligula tincidunt iaculis. Quisque ultrices dolor ac quam posuere finibus. Sed nec augue purus. Curabitur vehicula vestibulum ante, eu pharetra velit viverra non. Aenean vulputate aliquam elit nec sollicitudin. Vivamus non eleifend tortor.\n\nIn commodo nunc nisl. Cras dolor sem, semper ut nulla id, ultrices placerat arcu. Morbi lectus est, semper eu ligula ac, molestie elementum ex. Nullam condimentum vitae nulla quis egestas. Nulla in arcu leo. In hac habitasse platea dictumst. Etiam volutpat enim vitae semper imperdiet.",
      "experienceRequired": "No Experience Required",
      "lastDate": new Date("2024-04-25T18:30:00"),
      "minimumSalary": 10000,
      "maximumSalary": 15000,
      "applied": false
    },
    {
      "id": "19893141-258c-4523-0800-08dc4fde1518",
      "publishedBy": "Medi Solutions",
      "publishedDate": new Date("2024-03-29T10:49:49.657"),
      "noOfVacancies": 1,
      "minimumQualification": "MBA",
      "jobTitle": "Production Manager",
      "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
      "experienceRequired": "3 to 5 years",
      "lastDate": new Date("2024-04-10T18:30:00"),
      "minimumSalary": 50000,
      "maximumSalary": 75000,
      "applied": false
    },
    {
      "id": "24693f27-2382-4ead-0801-08dc4fde1518",
      "publishedBy": "Shelby Foundation",
      "publishedDate": new Date("2024-03-29T10:52:42.857"),
      "noOfVacancies": 3,
      "minimumQualification": "MBA",
      "jobTitle": "Event Organizer",
      "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
      "experienceRequired": "3 to 5 years",
      "lastDate": new Date("2024-05-15T18:30:00"),
      "minimumSalary": 30000,
      "maximumSalary": 45000,
      "applied": false
    }
];

let response: Response = {
  message : '',
  isSuccess : true,
  result : vacancyListResponse
}

let failResponse: Response = {
  message : '',
  isSuccess : false,
}

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let publicService: any;
  let el: DebugElement;
  let event: PageEvent;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    const publicServiceSpy = jasmine.createSpyObj('PublicService', ['getAllVacancies']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule
      ],
      providers: [
        { provide: PublicService, useValue: publicServiceSpy }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      httpTestingController = TestBed.inject(HttpTestingController)
      publicService = TestBed.inject<PublicService>(PublicService);
    });
  }));
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch on ngOnInit', () => {
    publicService.getAllVacancies.and.returnValue(of(response));

    component.ngOnInit();

    expect(component.isVacancyVisible).toBeTrue();
    expect(component.allvacancies).toEqual(vacancyListResponse);
    expect(component.vacancies).toEqual(vacancyListResponse.slice(component.first, component.first+component.rows));
    expect(component.totalRecords).toBe(vacancyListResponse.length);

  });

  it('should display vancancies', () => {
    publicService.getAllVacancies.and.returnValue(of(response));

    component.ngOnInit();

    fixture.detectChanges();

    const vacancies = el.queryAll(By.css('.card'));
    expect(vacancies.length).toBe(3);
  })

  it('should filter vacancies', () => {
    publicService.getAllVacancies.and.returnValue(of(response));

    component.ngOnInit();

    component.filterResults('Quality Manager');

    expect(component.totalRecords).toBe(1);
    expect(component.vacancies).toEqual([vacancyListResponse[1]]);
    expect(component.searchText).toEqual('Quality Manager');
    
    component.filterResults('');
    
    expect(component.vacancies).toEqual(vacancyListResponse.slice(component.first, component.first+component.rows));
    expect(component.totalRecords).toBe(vacancyListResponse.length);
    expect(component.searchText).toEqual('');
  });

  it('should handle page change', () => {
    publicService.getAllVacancies.and.returnValue(of(response));

    component.ngOnInit();

    event = {
      first: 0,
      rows: 3
    }

    component.onPageChange(event);

    expect(component.vacancies?.length).toEqual(3);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});