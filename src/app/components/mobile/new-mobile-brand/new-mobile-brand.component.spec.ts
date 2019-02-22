import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMobileBrandComponent } from './new-mobile-brand.component';

describe('NewMobileBrandComponent', () => {
  let component: NewMobileBrandComponent;
  let fixture: ComponentFixture<NewMobileBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMobileBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMobileBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
