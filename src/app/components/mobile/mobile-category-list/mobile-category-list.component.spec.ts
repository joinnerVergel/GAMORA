import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCategoryListComponent } from './mobile-category-list.component';

describe('MobileCategoryListComponent', () => {
  let component: MobileCategoryListComponent;
  let fixture: ComponentFixture<MobileCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
