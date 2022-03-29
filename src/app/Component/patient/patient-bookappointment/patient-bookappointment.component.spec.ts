import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBookappointmentComponent } from './patient-bookappointment.component';

describe('PatientBookappointmentComponent', () => {
  let component: PatientBookappointmentComponent;
  let fixture: ComponentFixture<PatientBookappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBookappointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBookappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
