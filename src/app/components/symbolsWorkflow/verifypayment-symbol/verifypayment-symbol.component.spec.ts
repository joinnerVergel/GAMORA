import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifypaymentSymbolComponent } from './verifypayment-symbol.component';

describe('VerifypaymentSymbolComponent', () => {
  let component: VerifypaymentSymbolComponent;
  let fixture: ComponentFixture<VerifypaymentSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifypaymentSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifypaymentSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
