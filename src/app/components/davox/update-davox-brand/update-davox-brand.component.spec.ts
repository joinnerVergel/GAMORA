import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDavoxBrandComponent } from './update-davox-brand.component';

describe('UpdateDavoxBrandComponent', () => {
  let component: UpdateDavoxBrandComponent;
  let fixture: ComponentFixture<UpdateDavoxBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDavoxBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDavoxBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
