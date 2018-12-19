import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDebtComponent } from './age-debt.component';

describe('AgeDebtComponent', () => {
  let component: AgeDebtComponent;
  let fixture: ComponentFixture<AgeDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
