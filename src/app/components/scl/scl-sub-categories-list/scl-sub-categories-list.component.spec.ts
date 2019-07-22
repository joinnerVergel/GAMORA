import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclSubCategoriesListComponent } from './scl-sub-categories-list.component';

describe('SclSubCategoriesListComponent', () => {
  let component: SclSubCategoriesListComponent;
  let fixture: ComponentFixture<SclSubCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclSubCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclSubCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
