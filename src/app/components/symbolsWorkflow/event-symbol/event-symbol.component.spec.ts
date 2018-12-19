import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSymbolComponent } from './event-symbol.component';

describe('EventSymbolComponent', () => {
  let component: EventSymbolComponent;
  let fixture: ComponentFixture<EventSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
