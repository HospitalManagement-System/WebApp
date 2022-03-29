import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUserComponent } from './patient-user.component';

describe('PatientUserComponent', () => {
  let component: PatientUserComponent;
  let fixture: ComponentFixture<PatientUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
