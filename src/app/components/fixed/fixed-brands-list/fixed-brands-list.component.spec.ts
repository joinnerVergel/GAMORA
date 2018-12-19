import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBrandsListComponent } from './fixed-brands-list.component';

describe('FixedBrandsListComponent', () => {
  let component: FixedBrandsListComponent;
  let fixture: ComponentFixture<FixedBrandsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedBrandsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedBrandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
