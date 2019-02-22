import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSubCategoryElementsListComponent } from './mobile-sub-category-elements-list.component';

describe('MobileSubCategoryElementsListComponent', () => {
  let component: MobileSubCategoryElementsListComponent;
  let fixture: ComponentFixture<MobileSubCategoryElementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSubCategoryElementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSubCategoryElementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
