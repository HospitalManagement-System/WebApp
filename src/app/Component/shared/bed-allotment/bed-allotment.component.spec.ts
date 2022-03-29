import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAllotmentComponent } from './bed-allotment.component';

describe('BedAllotmentComponent', () => {
  let component: BedAllotmentComponent;
  let fixture: ComponentFixture<BedAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
