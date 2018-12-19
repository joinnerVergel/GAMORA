import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedGroupsListComponent } from './fixed-groups-list.component';

describe('FixedGroupsListComponent', () => {
  let component: FixedGroupsListComponent;
  let fixture: ComponentFixture<FixedGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
