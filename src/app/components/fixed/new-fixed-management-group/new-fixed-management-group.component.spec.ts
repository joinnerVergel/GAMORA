import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFixedManagementGroupComponent } from './new-fixed-management-group.component';

describe('NewFixedManagementGroupComponent', () => {
  let component: NewFixedManagementGroupComponent;
  let fixture: ComponentFixture<NewFixedManagementGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFixedManagementGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFixedManagementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
