import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailogeComponent } from './add-dailoge.component';

describe('AddDailogeComponent', () => {
  let component: AddDailogeComponent;
  let fixture: ComponentFixture<AddDailogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDailogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
