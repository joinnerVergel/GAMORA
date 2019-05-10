import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventsComponent } from './time-line-events.component';

describe('TimeLineEventsComponent', () => {
  let component: TimeLineEventsComponent;
  let fixture: ComponentFixture<TimeLineEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
