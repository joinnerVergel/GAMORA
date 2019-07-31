import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxManagerListComponent } from './davox-manager-list.component';

describe('DavoxManagerListComponent', () => {
  let component: DavoxManagerListComponent;
  let fixture: ComponentFixture<DavoxManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
