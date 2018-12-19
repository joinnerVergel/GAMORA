import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndSymbolComponent } from './end-symbol.component';

describe('EndSymbolComponent', () => {
  let component: EndSymbolComponent;
  let fixture: ComponentFixture<EndSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
