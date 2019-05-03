import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleViaConfigurationComponent } from './double-via-configuration.component';

describe('DoubleViaConfigurationComponent', () => {
  let component: DoubleViaConfigurationComponent;
  let fixture: ComponentFixture<DoubleViaConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleViaConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleViaConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
