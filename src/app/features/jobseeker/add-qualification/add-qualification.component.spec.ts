import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualificationComponent } from './add-qualification.component';

xdescribe('AddQualificationComponent', () => {
  let component: AddQualificationComponent;
  let fixture: ComponentFixture<AddQualificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQualificationComponent]
    });
    fixture = TestBed.createComponent(AddQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
