import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFixedWorkflowComponent } from './new-fixed-workflow.component';

describe('NewFixedWorkflowComponent', () => {
  let component: NewFixedWorkflowComponent;
  let fixture: ComponentFixture<NewFixedWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFixedWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFixedWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
