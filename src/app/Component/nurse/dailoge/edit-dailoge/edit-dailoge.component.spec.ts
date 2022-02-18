import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDailogeComponent } from './edit-dailoge.component';

describe('EditDailogeComponent', () => {
  let component: EditDailogeComponent;
  let fixture: ComponentFixture<EditDailogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDailogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDailogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
