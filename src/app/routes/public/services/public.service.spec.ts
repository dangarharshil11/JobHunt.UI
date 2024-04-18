import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { PublicService } from './public.service';
import { VacancyResponse } from '../models/vacancy-response.model';
import { environment } from 'src/environments/environment';
import { Organization } from '../models/organization.model';
import { ApplicationRequest } from '../models/application-request.model';

let vacancyListResponse = {
    "result": [
      {
        "id": "61edda4f-ebdd-42f9-ed13-08dc39205bd7",
        "publishedBy": "Green Solutions",
        "publishedDate": "2024-02-29T12:20:18.532",
        "noOfVacancies": 2,
        "minimumQualification": "BE in Civil",
        "jobTitle": "Site Manager",
        "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
        "experienceRequired": "3 to 5 years",
        "lastDate": "2024-03-08T00:00:00",
        "minimumSalary": 30000,
        "maximumSalary": 50000,
        "applied": null
      },
      {
        "id": "674da545-6231-476e-e018-08dc3c4d373a",
        "publishedBy": "Medi Solutions",
        "publishedDate": "2024-03-04T13:14:57.467",
        "noOfVacancies": 2,
        "minimumQualification": "B. Pharm",
        "jobTitle": "Quality Manager",
        "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget porttitor justo. Phasellus at magna eu orci commodo interdum. Cras at aliquet ligula. Aliquam id venenatis tortor, in laoreet arcu. In ultrices tempor purus nec dapibus. Sed accumsan tortor a dui posuere, nec sodales tortor gravida. Proin mollis massa mauris, vel placerat felis congue non.\n\nMauris consectetur risus at justo aliquet, non dictum enim imperdiet. Proin id tellus eget tellus sagittis rhoncus sed quis sem. Quisque a ligula sed nisi lacinia tempus. Phasellus gravida urna ipsum, ut tristique risus mollis a. Nam nibh est, tristique eget est in, tempus tempus nulla. Etiam cursus, mauris nec molestie egestas, magna est sodales libero, sit amet lobortis magna sapien et diam. Aliquam non velit vitae erat sollicitudin placerat non id enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sagittis turpis ac felis convallis, eu bibendum lectus volutpat. Integer nec est orci. Aenean sit amet egestas neque, ut consectetur enim. In est sapien, dictum vitae risus non, sagittis rhoncus est.\n\nSuspendisse nec enim nec tortor laoreet vulputate ac nec tortor. Quisque pulvinar efficitur velit in lacinia. In viverra, lacus et maximus tincidunt, velit velit gravida sem, vitae tristique arcu ipsum eu odio. Phasellus fermentum ornare risus, dignissim maximus elit fermentum et. Suspendisse ultricies ultrices ornare. Curabitur molestie pellentesque orci in scelerisque. Donec vestibulum justo sed laoreet ultricies. Sed molestie sem id dolor suscipit, ut finibus urna mollis. Cras gravida nibh non dapibus hendrerit.",
        "experienceRequired": "3 to 5 years",
        "lastDate": "2024-03-27T00:00:00",
        "minimumSalary": 37000,
        "maximumSalary": 30000,
        "applied": null
      },
      {
        "id": "3660948d-570c-488b-4458-08dc3ccc67b1",
        "publishedBy": "Green Solutions",
        "publishedDate": "2024-03-05T00:00:00",
        "noOfVacancies": 5,
        "minimumQualification": "MBA",
        "jobTitle": "Senior Customer Executive",
        "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
        "experienceRequired": "3 to 5 years",
        "lastDate": "2024-03-10T00:00:00",
        "minimumSalary": 30000,
        "maximumSalary": 25000,
        "applied": null
      },
      {
        "id": "51b1bbe3-14b5-4000-bbe7-08dc3ea06d85",
        "publishedBy": "Medi Solutions",
        "publishedDate": "2024-03-07T12:16:55.351",
        "noOfVacancies": 5,
        "minimumQualification": "Graduate in any stream",
        "jobTitle": "Marketing Intern",
        "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc massa nisl, cursus eget tempor vitae, porttitor eget nibh. Donec porttitor in velit vitae fermentum. Proin aliquet sapien magna. Sed vitae placerat est. Nam sagittis justo at eleifend consequat. Fusce efficitur, felis non imperdiet vulputate, purus ipsum viverra sem, eu aliquam diam metus vel libero. Proin aliquet id felis nec dignissim. Nulla lacinia ornare metus sit amet accumsan. Curabitur iaculis purus ut aliquet placerat. Nulla condimentum ac elit a tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vehicula nisl eget tellus ultricies vulputate. Phasellus molestie semper luctus.\n\nNunc dictum velit in pellentesque posuere. Etiam nec suscipit magna. Etiam interdum nibh ac tortor varius, in sodales dui pretium. Integer a neque magna. Donec rhoncus velit at tristique porta. Etiam odio massa, fermentum sed sagittis sed, malesuada vel ante. Ut ac nisi quam.\n\nNulla vitae ante sed est consequat dictum. Etiam vitae magna sed augue porta scelerisque. Nam pulvinar ornare urna, eget mattis metus consequat in. Praesent a nisl quis ante tempus dapibus quis eget mi. Vestibulum cursus mauris nibh, tristique rhoncus tortor eleifend eget. Vivamus sagittis lorem a risus volutpat luctus. Morbi mollis lectus at feugiat pellentesque. Vestibulum ac lorem nec quam rutrum sodales id sed est. Praesent vel accumsan tellus, ut facilisis velit.",
        "experienceRequired": "No Experience Required",
        "lastDate": "2024-03-26T18:30:00",
        "minimumSalary": 15000,
        "maximumSalary": 10000,
        "applied": null
      },
      {
        "id": "cf91f57a-cea8-4af6-58be-08dc4a3dde2d",
        "publishedBy": "Shelby Foundation",
        "publishedDate": "2024-03-22T07:00:51.75",
        "noOfVacancies": 5,
        "minimumQualification": "Graduate in any stream",
        "jobTitle": "Interns",
        "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit enim. Praesent ut ultrices sem. Vivamus euismod, magna sed dignissim dictum, sem massa fringilla erat, in interdum ligula quam in lectus. Quisque sed leo ut lacus lacinia rutrum at vel odio. Pellentesque finibus tristique purus, at imperdiet lacus sagittis nec. In bibendum enim eu erat feugiat, eu scelerisque erat aliquet. Proin et viverra quam. Nunc aliquet nec nulla non consectetur. Aenean at nisi leo. Cras vehicula, mauris ac porta sodales, ante odio scelerisque leo, et commodo metus lorem eget orci. Integer sed sapien elementum, blandit orci id, finibus ante. Proin pulvinar viverra vestibulum. Nunc quis dolor laoreet magna bibendum tristique at facilisis diam. Nulla molestie eleifend quam, in pretium est pretium eu. Nunc bibendum sed sem lacinia mollis.\n\nFusce pharetra ipsum augue, ac ultrices dolor pretium nec. Morbi vestibulum mollis urna, et pellentesque tellus malesuada dignissim. Vivamus aliquam quam eget dui mattis sodales. Quisque ultrices mi quis turpis venenatis, vel finibus elit bibendum. Nulla porta dolor odio, at maximus ipsum vestibulum vitae. Sed feugiat nec odio sed facilisis. Fusce massa diam, elementum ut varius a, consequat a elit. Aenean lobortis vitae tellus ac posuere. Sed in lorem id est tempus posuere. Cras sed convallis leo. Nullam ultrices ante vitae ligula tincidunt iaculis. Quisque ultrices dolor ac quam posuere finibus. Sed nec augue purus. Curabitur vehicula vestibulum ante, eu pharetra velit viverra non. Aenean vulputate aliquam elit nec sollicitudin. Vivamus non eleifend tortor.\n\nIn commodo nunc nisl. Cras dolor sem, semper ut nulla id, ultrices placerat arcu. Morbi lectus est, semper eu ligula ac, molestie elementum ex. Nullam condimentum vitae nulla quis egestas. Nulla in arcu leo. In hac habitasse platea dictumst. Etiam volutpat enim vitae semper imperdiet.",
        "experienceRequired": "No Experience Required",
        "lastDate": "2024-04-25T18:30:00",
        "minimumSalary": 10000,
        "maximumSalary": 15000,
        "applied": null
      },
      {
        "id": "19893141-258c-4523-0800-08dc4fde1518",
        "publishedBy": "Medi Solutions",
        "publishedDate": "2024-03-29T10:49:49.657",
        "noOfVacancies": 1,
        "minimumQualification": "MBA",
        "jobTitle": "Production Manager",
        "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
        "experienceRequired": "3 to 5 years",
        "lastDate": "2024-04-10T18:30:00",
        "minimumSalary": 50000,
        "maximumSalary": 75000,
        "applied": null
      },
      {
        "id": "24693f27-2382-4ead-0801-08dc4fde1518",
        "publishedBy": "Shelby Foundation",
        "publishedDate": "2024-03-29T10:52:42.857",
        "noOfVacancies": 3,
        "minimumQualification": "MBA",
        "jobTitle": "Event Organizer",
        "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
        "experienceRequired": "3 to 5 years",
        "lastDate": "2024-05-15T18:30:00",
        "minimumSalary": 30000,
        "maximumSalary": 45000,
        "applied": null
      }
    ],
    "isSuccess": true,
    "message": ""
}

let vacancyResponse = {
  "result": {
    "id": "61edda4f-ebdd-42f9-ed13-08dc39205bd7",
    "publishedBy": "Green Solutions",
    "publishedDate": "2024-02-29T12:20:18.532",
    "noOfVacancies": 2,
    "minimumQualification": "BE in Civil",
    "jobTitle": "Site Manager",
    "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
    "experienceRequired": "3 to 5 years",
    "lastDate": "2024-03-08T00:00:00",
    "minimumSalary": 30000,
    "maximumSalary": 50000,
    "applied": false
  },
  "isSuccess": true,
  "message": ""
}

let orgainzationProfile = {
  "result": {
    "organization": "Green Solutions",
    "organizationType": "Agriculture",
    "companyEmail": "info@greensolutions.com",
    "companyPhone": "9988776655",
    "noOfEmployees": 100,
    "startYear": 2020,
    "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus massa ante, vitae tempus risus varius sed. Etiam ut eros pretium, lobortis metus sit amet, aliquet mauris. Sed augue urna, porttitor et enim aliquet, efficitur dignissim nisl. Ut ut lacus ac justo mattis tristique in at justo. Curabitur convallis diam et felis commodo euismod. Pellentesque metus diam, ultrices non tincidunt vitae, lacinia a libero. Aenean tempus purus a mi fermentum, eu volutpat ante accumsan. In libero neque, maximus nec egestas sit amet, ultricies quis enim. Donec non eros eget purus cursus venenatis pharetra ac tellus. Curabitur justo lacus, convallis non orci sed, dictum fermentum felis.\n\nSuspendisse fringilla sapien a sem finibus luctus. Mauris hendrerit diam magna, eget porttitor mauris convallis vel. Nulla gravida dui eu eleifend molestie. Duis nisi magna, facilisis vitae quam vitae, imperdiet tempus nisi. Phasellus in finibus orci. Proin vel rutrum felis. Praesent quis lacinia quam. Curabitur at mi sed leo semper pulvinar ut a est.\n\nAenean metus ex, ornare vel lacus condimentum, commodo placerat ipsum. Maecenas nec orci ac urna faucibus aliquet ac a urna. Praesent vitae tellus vel metus accumsan sodales ut eu odio. Aenean eget justo at tortor efficitur sodales. Maecenas condimentum odio nulla, nec rhoncus lectus placerat quis. Integer non elit sed leo condimentum sodales quis in neque. Donec vel felis at erat tincidunt blandit. Maecenas ut magna eros. Cras eu enim dictum, faucibus nunc ac, sodales sapien. Mauris facilisis fermentum dolor, id ullamcorper felis mattis non. Nulla sodales odio ac lectus fringilla luctus. Sed sed tincidunt nisl. Aenean luctus ac nulla eget pellentesque. Mauris nec tortor dolor. Donec euismod hendrerit magna eu cursus.",
    "createdBy": "demoemployer@email.com",
    "imageUrl": "https://localhost:7284/Images/2d967414-5688-4dc0-a23a-dbf7880b19d6.jpg"
  },
  "isSuccess": true,
  "message": ""
}

let applicationSuccessResponse = {
  "result": {
    "id": "d53fc673-5ed8-46e3-615e-08dc5226e704",
    "vacancyId": "61edda4f-ebdd-42f9-ed13-08dc39205bd7",
    "vacancy": null,
    "user": null,
    "userId": "41e68188-4d6c-49db-964a-b0c64ef4c57b",
    "appliedDate": "2024-04-01T08:29:06.978Z",
    "applicationStatus": "SUBMITTED",
    "totalRecords": null
  },
  "isSuccess": true,
  "message": "Applied Successfully"
}

let applicationFailureResponse = {
  "result": null,
  "isSuccess": false,
  "message": "You have Already Applied"
}

let userResponse = {
  "result": {
    "id": "41e68188-4d6c-49db-964a-b0c64ef4c57b",
    "firstName": "Kakashi",
    "lastName": "Hatake",
    "email": "kakashithecopyninja@leaf.com",
    "phone": "9876543210",
    "address": "House No: 1002,\nRandom Street,\nRandom City",
    "totalExperience": 10,
    "expectedSalary": 900000,
    "resumeUrl": "https://localhost:7246/Resumes/41e68188-4d6c-49db-964a-b0c64ef4c57b.pdf",
    "imageUrl": "",
    "dateOfBirth": "1990-01-15T18:30:00"
  },
  "isSuccess": true,
  "message": ""
}

describe('PublicService', () => {
  let publicService: PublicService,
        httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                PublicService
            ]
        });

        publicService = TestBed.inject(PublicService)
        httpTestingController = TestBed.inject(HttpTestingController)
    });

    it("should retrieve all vacancies", () => {
      publicService.getAllVacancies().subscribe(
          response => {
              expect(response.result).withContext('result not found').toBeTruthy();

              expect(response.isSuccess).toBe(true);

              const vacancy: VacancyResponse = response.result.find((v: VacancyResponse) => v.id == "61edda4f-ebdd-42f9-ed13-08dc39205bd7");
              expect(vacancy.publishedBy).toBe("Green Solutions");
              expect(vacancy.jobTitle).toBe("Site Manager");
          });
      
      const req = httpTestingController.expectOne(`${environment.employerapiBaseUrl}/api/vacancy/getAllVacancies`);
      expect(req.request.method).toEqual("GET");

      req.flush(vacancyListResponse);
    });

    it("should retrieve vacancy by id", () => {
      publicService.getVacancyById("61edda4f-ebdd-42f9-ed13-08dc39205bd7").subscribe(
          response => {
              expect(response.result).withContext('result not found').toBeTruthy();

              expect(response.isSuccess).toBe(true);

              const vacancy: VacancyResponse = response.result;

              expect(vacancy.publishedBy).toBe("Green Solutions");
              expect(vacancy.jobTitle).toBe("Site Manager");
          });
      
      const req = httpTestingController.expectOne(`${environment.employerapiBaseUrl}/api/vacancy/getVacancyById/61edda4f-ebdd-42f9-ed13-08dc39205bd7?addAuth=true`);
      expect(req.request.method).toEqual("GET");
      
      req.flush(vacancyResponse);
    });

    it("should retrieve organization profile by organization name", () => {
      publicService.getProfileByName("Green Solutions").subscribe(
          response => {
              expect(response.result).withContext('result not found').toBeTruthy();

              expect(response.isSuccess).toBe(true);

              const orgainzation: Organization = response.result;

              expect(orgainzation.organization).toBe("Green Solutions");
              expect(orgainzation.companyEmail).toBe("info@greensolutions.com");
          });
      
      const req = httpTestingController.expectOne(`${environment.employerapiBaseUrl}/api/company/getProfileByName/Green Solutions`);
      expect(req.request.method).toEqual("GET");
      
      req.flush(orgainzationProfile);
    });

    it("should add jobapplication", () => {
      let request: ApplicationRequest = {
        vacancyId: "61edda4f-ebdd-42f9-ed13-08dc39205bd7", 
        userId: "41e68188-4d6c-49db-964a-b0c64ef4c57b", 
        appliedDate: new Date()
      }

      publicService.apply(request).subscribe(
          response => {
            expect(response.result).withContext('result not found').toBeTruthy();
            expect(response.isSuccess).toBe(true);
            expect(response.message).toEqual("Applied Successfully");

            expect(response.result.applicationStatus).toEqual("SUBMITTED")
            expect(response.result.id).toEqual("d53fc673-5ed8-46e3-615e-08dc5226e704")
          });
      
      const req = httpTestingController.expectOne(`${environment.employerapiBaseUrl}/api/application/createApplication?addAuth=true`);
      expect(req.request.method).toEqual("POST");

      expect(req.request.body.vacancyId).toEqual(request.vacancyId);
      expect(req.request.body.userId).toEqual(request.userId);
      expect(req.request.body.appliedDate).toEqual(request.appliedDate);
      
      req.flush(applicationSuccessResponse);
    });

    it("should return failure if user has already applied", () => {
      let request: ApplicationRequest = {
        vacancyId: "61edda4f-ebdd-42f9-ed13-08dc39205bd7", 
        userId: "41e68188-4d6c-49db-964a-b0c64ef4c57b", 
        appliedDate: new Date()
      }

      publicService.apply(request).subscribe(
          response => {
            expect(response.isSuccess).toBe(false);
            expect(response.message).toEqual("You have Already Applied");

            expect(response.result).toBeNull();
          });
      
      const req = httpTestingController.expectOne(`${environment.employerapiBaseUrl}/api/application/createApplication?addAuth=true`);
      expect(req.request.method).toEqual("POST");

      expect(req.request.body.vacancyId).toEqual(request.vacancyId);
      expect(req.request.body.userId).toEqual(request.userId);
      expect(req.request.body.appliedDate).toEqual(request.appliedDate);
      
      req.flush(applicationFailureResponse);
    });

    it('should retrieve user details by id', () => {
      publicService.getUserDetails("41E68188-4D6C-49DB-964A-B0C64EF4C57B").subscribe(
        response => {
          expect(response.result).withContext('result not found').toBeTruthy();
          expect(response.isSuccess).toBe(true);

          var result = response.result;
          expect(result.id).toEqual('41e68188-4d6c-49db-964a-b0c64ef4c57b');
        });

      const req = httpTestingController.expectOne(`${environment.jobseekerapiBaseUrl}/api/jobSeeker/getByUserId/41E68188-4D6C-49DB-964A-B0C64EF4C57B?addAuth=true`);
      expect(req.request.method).toEqual("GET");
      
      req.flush(userResponse);
    });

    afterEach(() => {
      httpTestingController.verify();
    })
});
