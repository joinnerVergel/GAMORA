import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWorkflowListComponent } from './fixed-workflow-list.component';

describe('FixedWorkflowListComponent', () => {
  let component: FixedWorkflowListComponent;
  let fixture: ComponentFixture<FixedWorkflowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedWorkflowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedWorkflowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
