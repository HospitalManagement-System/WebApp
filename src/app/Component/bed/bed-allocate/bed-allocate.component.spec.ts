import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAllocateComponent } from './bed-allocate.component';

describe('BedAllocateUserComponent', () => {
  let component: BedAllocateComponent;
  let fixture: ComponentFixture<BedAllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedAllocateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
