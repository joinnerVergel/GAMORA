import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEditWorkFlowComponent } from './mobile-edit-work-flow.component';

describe('MobileEditWorkFlowComponent', () => {
  let component: MobileEditWorkFlowComponent;
  let fixture: ComponentFixture<MobileEditWorkFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileEditWorkFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEditWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
