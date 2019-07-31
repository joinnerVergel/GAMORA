import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxGroupsListComponent } from './davox-groups-list.component';

describe('DavoxGroupsListComponent', () => {
  let component: DavoxGroupsListComponent;
  let fixture: ComponentFixture<DavoxGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
