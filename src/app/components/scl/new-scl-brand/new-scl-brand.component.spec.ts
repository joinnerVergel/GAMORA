import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSclBrandComponent } from './new-scl-brand.component';

describe('NewSclBrandComponent', () => {
  let component: NewSclBrandComponent;
  let fixture: ComponentFixture<NewSclBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSclBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSclBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
