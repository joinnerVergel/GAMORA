import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxCategoryListComponent } from './davox-category-list.component';

describe('DavoxCategoryListComponent', () => {
  let component: DavoxCategoryListComponent;
  let fixture: ComponentFixture<DavoxCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
