import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSclWorkflowComponent } from './new-scl-workflow.component';

describe('NewSclWorkflowComponent', () => {
  let component: NewSclWorkflowComponent;
  let fixture: ComponentFixture<NewSclWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSclWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSclWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
