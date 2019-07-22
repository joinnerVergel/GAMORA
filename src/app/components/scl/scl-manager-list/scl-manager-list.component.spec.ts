import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclManagerListComponent } from './scl-manager-list.component';

describe('SclManagerListComponent', () => {
  let component: SclManagerListComponent;
  let fixture: ComponentFixture<SclManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
