import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxSubCategoriesListComponent } from './davox-sub-categories-list.component';

describe('DavoxSubCategoriesListComponent', () => {
  let component: DavoxSubCategoriesListComponent;
  let fixture: ComponentFixture<DavoxSubCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxSubCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxSubCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
