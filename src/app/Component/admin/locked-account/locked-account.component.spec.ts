import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedAccountComponent } from './locked-account.component';

describe('LockedAccountComponent', () => {
  let component: LockedAccountComponent;
  let fixture: ComponentFixture<LockedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
