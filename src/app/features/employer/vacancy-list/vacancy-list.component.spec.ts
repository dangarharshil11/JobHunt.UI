import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyListComponent } from './vacancy-list.component';

xdescribe('VacancyListComponent', () => {
  let component: VacancyListComponent;
  let fixture: ComponentFixture<VacancyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacancyListComponent]
    });
    fixture = TestBed.createComponent(VacancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
