import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedEditWorkFlowComponent } from './fixed-edit-work-flow.component';

describe('FixedEditWorkFlowComponent', () => {
  let component: FixedEditWorkFlowComponent;
  let fixture: ComponentFixture<FixedEditWorkFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedEditWorkFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedEditWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
