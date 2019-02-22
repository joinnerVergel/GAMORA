import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMobileManagementGroupComponent } from './new-mobile-management-group.component';

describe('NewMobileManagementGroupComponent', () => {
  let component: NewMobileManagementGroupComponent;
  let fixture: ComponentFixture<NewMobileManagementGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMobileManagementGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMobileManagementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
