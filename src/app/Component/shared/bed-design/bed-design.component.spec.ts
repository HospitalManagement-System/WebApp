import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedDesignComponent } from './bed-design.component';

describe('BedDesignComponent', () => {
  let component: BedDesignComponent;
  let fixture: ComponentFixture<BedDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
