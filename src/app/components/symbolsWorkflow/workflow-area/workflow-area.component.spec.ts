import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAreaComponent } from './workflow-area.component';

describe('WorkflowAreaComponent', () => {
  let component: WorkflowAreaComponent;
  let fixture: ComponentFixture<WorkflowAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
