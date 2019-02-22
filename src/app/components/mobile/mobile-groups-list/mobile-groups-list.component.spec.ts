import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileGroupsListComponent } from './mobile-groups-list.component';

describe('MobileGroupsListComponent', () => {
  let component: MobileGroupsListComponent;
  let fixture: ComponentFixture<MobileGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
