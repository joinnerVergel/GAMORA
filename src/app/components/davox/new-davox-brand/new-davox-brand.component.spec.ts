import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDavoxBrandComponent } from './new-davox-brand.component';

describe('NewDavoxBrandComponent', () => {
  let component: NewDavoxBrandComponent;
  let fixture: ComponentFixture<NewDavoxBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDavoxBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDavoxBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
