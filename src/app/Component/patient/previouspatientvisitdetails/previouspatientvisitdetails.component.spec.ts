import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviouspatientvisitdetailsComponent } from './previouspatientvisitdetails.component';

describe('PreviouspatientvisitdetailsComponent', () => {
  let component: PreviouspatientvisitdetailsComponent;
  let fixture: ComponentFixture<PreviouspatientvisitdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviouspatientvisitdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviouspatientvisitdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
