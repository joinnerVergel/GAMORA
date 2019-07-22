import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSclBrandComponent } from './update-scl-brand.component';

describe('UpdateSclBrandComponent', () => {
  let component: UpdateSclBrandComponent;
  let fixture: ComponentFixture<UpdateSclBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSclBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSclBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
