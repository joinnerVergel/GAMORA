import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenureFilterComponent } from './tenure-filter.component';

describe('TenureFilterComponent', () => {
  let component: TenureFilterComponent;
  let fixture: ComponentFixture<TenureFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenureFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
