import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPatientComponent } from './current-patient.component';

describe('CurrentPatientComponent', () => {
  let component: CurrentPatientComponent;
  let fixture: ComponentFixture<CurrentPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
