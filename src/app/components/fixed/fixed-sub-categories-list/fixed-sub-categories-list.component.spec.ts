import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSubCategoriesListComponent } from './fixed-sub-categories-list.component';

describe('FixedSubCategoriesListComponent', () => {
  let component: FixedSubCategoriesListComponent;
  let fixture: ComponentFixture<FixedSubCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSubCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSubCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
