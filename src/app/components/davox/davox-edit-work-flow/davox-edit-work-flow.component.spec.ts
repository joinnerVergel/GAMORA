import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxEditWorkFlowComponent } from './davox-edit-work-flow.component';

describe('DavoxEditWorkFlowComponent', () => {
  let component: DavoxEditWorkFlowComponent;
  let fixture: ComponentFixture<DavoxEditWorkFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxEditWorkFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxEditWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
