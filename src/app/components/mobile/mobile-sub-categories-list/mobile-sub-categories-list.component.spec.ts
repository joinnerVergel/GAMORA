import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSubCategoriesListComponent } from './mobile-sub-categories-list.component';

describe('MobileSubCategoriesListComponent', () => {
  let component: MobileSubCategoriesListComponent;
  let fixture: ComponentFixture<MobileSubCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSubCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSubCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
