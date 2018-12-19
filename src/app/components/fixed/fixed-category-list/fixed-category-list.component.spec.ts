import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCategoryListComponent } from './fixed-category-list.component';

describe('FixedCategoryListComponent', () => {
  let component: FixedCategoryListComponent;
  let fixture: ComponentFixture<FixedCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
