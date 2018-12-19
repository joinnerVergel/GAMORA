import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSubcategoryElementsListComponent } from './fixed-subcategory-elements-list.component';

describe('FixedSubcategoryElementsListComponent', () => {
  let component: FixedSubcategoryElementsListComponent;
  let fixture: ComponentFixture<FixedSubcategoryElementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSubcategoryElementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSubcategoryElementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
