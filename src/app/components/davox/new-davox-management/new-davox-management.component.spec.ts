import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDavoxManagementComponent } from './new-davox-management.component';

describe('NewDavoxManagementComponent', () => {
  let component: NewDavoxManagementComponent;
  let fixture: ComponentFixture<NewDavoxManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDavoxManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDavoxManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
