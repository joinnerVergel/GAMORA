import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSentDailyComponent } from './events-sent-daily.component';

describe('EventsSentDailyComponent', () => {
  let component: EventsSentDailyComponent;
  let fixture: ComponentFixture<EventsSentDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSentDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSentDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
