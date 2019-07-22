import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclCategoryListComponent } from './scl-category-list.component';

describe('SclCategoryListComponent', () => {
  let component: SclCategoryListComponent;
  let fixture: ComponentFixture<SclCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
