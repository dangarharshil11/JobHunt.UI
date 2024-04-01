import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationDetailsComponent } from './qualification-details.component';

xdescribe('QualificationDetailsComponent', () => {
  let component: QualificationDetailsComponent;
  let fixture: ComponentFixture<QualificationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualificationDetailsComponent]
    });
    fixture = TestBed.createComponent(QualificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
