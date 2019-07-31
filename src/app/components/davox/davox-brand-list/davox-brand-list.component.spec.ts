import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavoxBrandListComponent } from './davox-brand-list.component';

describe('DavoxBrandListComponent', () => {
  let component: DavoxBrandListComponent;
  let fixture: ComponentFixture<DavoxBrandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavoxBrandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavoxBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
