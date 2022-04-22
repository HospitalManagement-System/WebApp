import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursedashboardgridComponent } from './nursedashboardgrid.component';

describe('NursedashboardgridComponent', () => {
  let component: NursedashboardgridComponent;
  let fixture: ComponentFixture<NursedashboardgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursedashboardgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursedashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
