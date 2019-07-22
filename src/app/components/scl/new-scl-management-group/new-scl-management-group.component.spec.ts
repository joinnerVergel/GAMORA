import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSclManagementGroupComponent } from './new-scl-management-group.component';

describe('NewSclManagementGroupComponent', () => {
  let component: NewSclManagementGroupComponent;
  let fixture: ComponentFixture<NewSclManagementGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSclManagementGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSclManagementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
