import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFixedManagementComponent } from './new-fixed-management.component';

describe('NewFixedManagementComponent', () => {
  let component: NewFixedManagementComponent;
  let fixture: ComponentFixture<NewFixedManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFixedManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFixedManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
