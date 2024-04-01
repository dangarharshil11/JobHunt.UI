import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedusersListComponent } from './appliedusers-list.component';

xdescribe('AppliedusersListComponent', () => {
  let component: AppliedusersListComponent;
  let fixture: ComponentFixture<AppliedusersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedusersListComponent]
    });
    fixture = TestBed.createComponent(AppliedusersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
