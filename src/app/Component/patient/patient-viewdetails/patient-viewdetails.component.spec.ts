import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewdetailsComponent } from './patient-viewdetails.component';

describe('PatientViewdetailsComponent', () => {
  let component: PatientViewdetailsComponent;
  let fixture: ComponentFixture<PatientViewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientViewdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientViewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
