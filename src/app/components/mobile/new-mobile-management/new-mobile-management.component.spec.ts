import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMobileManagementComponent } from './new-mobile-management.component';

describe('NewMobileManagementComponent', () => {
  let component: NewMobileManagementComponent;
  let fixture: ComponentFixture<NewMobileManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMobileManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMobileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
