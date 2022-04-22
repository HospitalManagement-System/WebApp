import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDynamicTableComponent } from './patientdynamic-table.component';

describe('PatientDynamicTableComponent', () => {
  let component: PatientDynamicTableComponent;
  let fixture: ComponentFixture<PatientDynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDynamicTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
