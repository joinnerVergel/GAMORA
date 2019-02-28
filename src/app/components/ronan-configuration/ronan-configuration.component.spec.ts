import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RonanConfigurationComponent } from './ronan-configuration.component';

describe('RonanConfigurationComponent', () => {
  let component: RonanConfigurationComponent;
  let fixture: ComponentFixture<RonanConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RonanConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RonanConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
