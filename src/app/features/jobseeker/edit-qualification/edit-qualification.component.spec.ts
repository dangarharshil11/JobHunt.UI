import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQualificationComponent } from './edit-qualification.component';

xdescribe('EditQualificationComponent', () => {
  let component: EditQualificationComponent;
  let fixture: ComponentFixture<EditQualificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditQualificationComponent]
    });
    fixture = TestBed.createComponent(EditQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
