import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDavoxManagementGroupComponent } from './new-davox-management-group.component';

describe('NewDavoxManagementGroupComponent', () => {
  let component: NewDavoxManagementGroupComponent;
  let fixture: ComponentFixture<NewDavoxManagementGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDavoxManagementGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDavoxManagementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
