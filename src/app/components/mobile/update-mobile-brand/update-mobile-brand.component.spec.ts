import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMobileBrandComponent } from './update-mobile-brand.component';

describe('UpdateMobileBrandComponent', () => {
  let component: UpdateMobileBrandComponent;
  let fixture: ComponentFixture<UpdateMobileBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMobileBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMobileBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
