import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxWorkflowListComponent } from './davox-workflow-list.component';

describe('DavoxWorkflowListComponent', () => {
  let component: DavoxWorkflowListComponent;
  let fixture: ComponentFixture<DavoxWorkflowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxWorkflowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxWorkflowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
