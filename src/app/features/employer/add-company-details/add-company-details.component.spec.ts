import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyDetailsComponent } from './add-company-details.component';

xdescribe('AddCompanyDetailsComponent', () => {
  let component: AddCompanyDetailsComponent;
  let fixture: ComponentFixture<AddCompanyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompanyDetailsComponent]
    });
    fixture = TestBed.createComponent(AddCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
