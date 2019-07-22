import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclSubCategoryElementsListComponent } from './scl-sub-category-elements-list.component';

describe('SclSubCategoryElementsListComponent', () => {
  let component: SclSubCategoryElementsListComponent;
  let fixture: ComponentFixture<SclSubCategoryElementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclSubCategoryElementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclSubCategoryElementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
