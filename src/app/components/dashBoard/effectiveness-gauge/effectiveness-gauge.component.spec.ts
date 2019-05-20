import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivenessGaugeComponent } from './effectiveness-gauge.component';

describe('EffectivenessGaugeComponent', () => {
  let component: EffectivenessGaugeComponent;
  let fixture: ComponentFixture<EffectivenessGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectivenessGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectivenessGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
