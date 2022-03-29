import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTablegridComponent } from './mat-tablegrid.component';

describe('MatTablegridComponent', () => {
  let component: MatTablegridComponent;
  let fixture: ComponentFixture<MatTablegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTablegridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTablegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
