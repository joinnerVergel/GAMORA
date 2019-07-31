import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxSubCategoryElementsListComponent } from './davox-sub-category-elements-list.component';

describe('DavoxSubCategoryElementsListComponent', () => {
  let component: DavoxSubCategoryElementsListComponent;
  let fixture: ComponentFixture<DavoxSubCategoryElementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxSubCategoryElementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxSubCategoryElementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
