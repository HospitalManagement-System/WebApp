import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDailogeComponent } from './delete-dailoge.component';

describe('DeleteDailogeComponent', () => {
  let component: DeleteDailogeComponent;
  let fixture: ComponentFixture<DeleteDailogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDailogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDailogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
