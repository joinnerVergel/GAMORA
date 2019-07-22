import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSclManagementComponent } from './new-scl-management.component';

describe('NewSclManagementComponent', () => {
  let component: NewSclManagementComponent;
  let fixture: ComponentFixture<NewSclManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSclManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSclManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
