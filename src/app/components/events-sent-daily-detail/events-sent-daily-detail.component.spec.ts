import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSentDailyDetailComponent } from './events-sent-daily-detail.component';

describe('EventsSentDailyDetailComponent', () => {
  let component: EventsSentDailyDetailComponent;
  let fixture: ComponentFixture<EventsSentDailyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSentDailyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSentDailyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
