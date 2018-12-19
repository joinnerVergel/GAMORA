import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDebtValueComponent } from './filter-debt-value.component';

describe('FilterDebtValueComponent', () => {
  let component: FilterDebtValueComponent;
  let fixture: ComponentFixture<FilterDebtValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDebtValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDebtValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
