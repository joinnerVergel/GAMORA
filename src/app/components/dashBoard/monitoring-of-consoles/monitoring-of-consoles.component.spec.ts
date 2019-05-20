import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringOfConsolesComponent } from './monitoring-of-consoles.component';

describe('MonitoringOfConsolesComponent', () => {
  let component: MonitoringOfConsolesComponent;
  let fixture: ComponentFixture<MonitoringOfConsolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringOfConsolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringOfConsolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
