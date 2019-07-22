import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclWorkflowListComponent } from './scl-workflow-list.component';

describe('SclWorkflowListComponent', () => {
  let component: SclWorkflowListComponent;
  let fixture: ComponentFixture<SclWorkflowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclWorkflowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclWorkflowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
