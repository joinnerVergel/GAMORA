import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMobileWorkflowComponent } from './new-mobile-workflow.component';

describe('NewMobileWorkflowComponent', () => {
  let component: NewMobileWorkflowComponent;
  let fixture: ComponentFixture<NewMobileWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMobileWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMobileWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
