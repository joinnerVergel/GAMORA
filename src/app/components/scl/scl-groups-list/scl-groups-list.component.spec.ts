import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclGroupsListComponent } from './scl-groups-list.component';

describe('SclGroupsListComponent', () => {
  let component: SclGroupsListComponent;
  let fixture: ComponentFixture<SclGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
