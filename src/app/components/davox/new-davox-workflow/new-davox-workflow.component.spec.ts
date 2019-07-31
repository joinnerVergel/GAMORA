import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDavoxWorkflowComponent } from './new-davox-workflow.component';

describe('NewDavoxWorkflowComponent', () => {
  let component: NewDavoxWorkflowComponent;
  let fixture: ComponentFixture<NewDavoxWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDavoxWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDavoxWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
