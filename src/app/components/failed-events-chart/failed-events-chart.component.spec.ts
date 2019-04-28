import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedEventsChartComponent } from './failed-events-chart.component';

describe('FailedEventsChartComponent', () => {
  let component: FailedEventsChartComponent;
  let fixture: ComponentFixture<FailedEventsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedEventsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedEventsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
