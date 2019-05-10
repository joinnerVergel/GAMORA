import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistorySendedEventsxAccountComponent } from './table-history-sended-eventsx-account.component';

describe('TableHistorySendedEventsxAccountComponent', () => {
  let component: TableHistorySendedEventsxAccountComponent;
  let fixture: ComponentFixture<TableHistorySendedEventsxAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHistorySendedEventsxAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistorySendedEventsxAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
