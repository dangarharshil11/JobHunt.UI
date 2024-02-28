import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDetailsComponent } from './vacancy-details.component';

describe('VacancyDetailsComponent', () => {
  let component: VacancyDetailsComponent;
  let fixture: ComponentFixture<VacancyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacancyDetailsComponent]
    });
    fixture = TestBed.createComponent(VacancyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
