import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSymbolComponent } from './home-symbol.component';

describe('HomeSymbolComponent', () => {
  let component: HomeSymbolComponent;
  let fixture: ComponentFixture<HomeSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
