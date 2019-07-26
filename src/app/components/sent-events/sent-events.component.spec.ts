import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentEventsComponent } from './sent-events.component';

describe('SentEventsComponent', () => {
  let component: SentEventsComponent;
  let fixture: ComponentFixture<SentEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
