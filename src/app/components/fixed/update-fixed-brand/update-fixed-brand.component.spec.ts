import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFixedBrandComponent } from './update-fixed-brand.component';

describe('UpdateFixedBrandComponent', () => {
  let component: UpdateFixedBrandComponent;
  let fixture: ComponentFixture<UpdateFixedBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFixedBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFixedBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
