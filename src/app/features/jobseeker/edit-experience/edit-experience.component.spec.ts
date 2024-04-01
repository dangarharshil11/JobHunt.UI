import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExperienceComponent } from './edit-experience.component';

xdescribe('EditExperienceComponent', () => {
  let component: EditExperienceComponent;
  let fixture: ComponentFixture<EditExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditExperienceComponent]
    });
    fixture = TestBed.createComponent(EditExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
