import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclEditWorkFlowComponent } from './scl-edit-work-flow.component';

describe('SclEditWorkFlowComponent', () => {
  let component: SclEditWorkFlowComponent;
  let fixture: ComponentFixture<SclEditWorkFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclEditWorkFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclEditWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
