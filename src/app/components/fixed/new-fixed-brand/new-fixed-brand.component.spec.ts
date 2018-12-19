import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFixedBrandComponent } from './new-fixed-brand.component';

describe('NewBrandComponent', () => {
  let component: NewFixedBrandComponent;
  let fixture: ComponentFixture<NewFixedBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFixedBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFixedBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
