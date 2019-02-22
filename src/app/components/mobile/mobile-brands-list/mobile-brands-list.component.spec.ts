import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBrandsListComponent } from './mobile-brands-list.component';

describe('MobileBrandsListComponent', () => {
  let component: MobileBrandsListComponent;
  let fixture: ComponentFixture<MobileBrandsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBrandsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBrandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
