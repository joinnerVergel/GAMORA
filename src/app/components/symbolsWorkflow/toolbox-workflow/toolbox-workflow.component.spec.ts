import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxWorkflowComponent } from './toolbox-workflow.component';

describe('ToolboxWorkflowComponent', () => {
  let component: ToolboxWorkflowComponent;
  let fixture: ComponentFixture<ToolboxWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolboxWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
