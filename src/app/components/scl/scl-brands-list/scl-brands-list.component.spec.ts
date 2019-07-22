import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclBrandsListComponent } from './scl-brands-list.component';

describe('SclBrandsListComponent', () => {
  let component: SclBrandsListComponent;
  let fixture: ComponentFixture<SclBrandsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclBrandsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclBrandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
