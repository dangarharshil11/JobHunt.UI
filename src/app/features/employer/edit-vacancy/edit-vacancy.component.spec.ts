import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacancyComponent } from './edit-vacancy.component';

describe('EditVacancyComponent', () => {
  let component: EditVacancyComponent;
  let fixture: ComponentFixture<EditVacancyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVacancyComponent]
    });
    fixture = TestBed.createComponent(EditVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
