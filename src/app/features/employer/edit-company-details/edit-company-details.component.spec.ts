import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDetailsComponent } from './edit-company-details.component';

xdescribe('EditCompanyDetailsComponent', () => {
  let component: EditCompanyDetailsComponent;
  let fixture: ComponentFixture<EditCompanyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompanyDetailsComponent]
    });
    fixture = TestBed.createComponent(EditCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
