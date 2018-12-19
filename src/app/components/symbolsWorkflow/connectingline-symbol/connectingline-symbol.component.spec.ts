import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectinglineSymbolComponent } from './connectingline-symbol.component';

describe('ConnectinglineSymbolComponent', () => {
  let component: ConnectinglineSymbolComponent;
  let fixture: ComponentFixture<ConnectinglineSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectinglineSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectinglineSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
