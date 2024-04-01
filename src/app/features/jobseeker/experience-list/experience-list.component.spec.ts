import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceListComponent } from './experience-list.component';

xdescribe('ExperienceListComponent', () => {
  let component: ExperienceListComponent;
  let fixture: ComponentFixture<ExperienceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceListComponent]
    });
    fixture = TestBed.createComponent(ExperienceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
