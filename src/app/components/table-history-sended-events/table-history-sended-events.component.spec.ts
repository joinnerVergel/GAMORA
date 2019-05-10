import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistorySendedEventsComponent } from './table-history-sended-events.component';

describe('TableHistorySendedEventsComponent', () => {
  let component: TableHistorySendedEventsComponent;
  let fixture: ComponentFixture<TableHistorySendedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHistorySendedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistorySendedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
