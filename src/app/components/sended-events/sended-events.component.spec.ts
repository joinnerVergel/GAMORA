import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendedEventsComponent } from './sended-events.component';

describe('SendedEventsComponent', () => {
  let component: SendedEventsComponent;
  let fixture: ComponentFixture<SendedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
