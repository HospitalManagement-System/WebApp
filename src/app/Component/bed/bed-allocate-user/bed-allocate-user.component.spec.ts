import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAllocateUserComponent } from './bed-allocate-user.component';

describe('BedAllocateUserComponent', () => {
  let component: BedAllocateUserComponent;
  let fixture: ComponentFixture<BedAllocateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedAllocateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedAllocateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
