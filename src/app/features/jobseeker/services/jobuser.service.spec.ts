import { TestBed } from '@angular/core/testing';

import { JobuserService } from './jobuser.service';

xdescribe('JobuserService', () => {
  let service: JobuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
