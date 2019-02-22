import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileWorkflowListComponent } from './mobile-workflow-list.component';

describe('MobileWorkflowListComponent', () => {
  let component: MobileWorkflowListComponent;
  let fixture: ComponentFixture<MobileWorkflowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWorkflowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWorkflowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
