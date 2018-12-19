import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldSymbolComponent } from './hold-symbol.component';

describe('HoldSymbolComponent', () => {
  let component: HoldSymbolComponent;
  let fixture: ComponentFixture<HoldSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
