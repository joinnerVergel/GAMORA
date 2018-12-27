import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedManagerListComponent } from './fixed-manager-list.component';

describe('FixedManagerListComponent', () => {
  let component: FixedManagerListComponent;
  let fixture: ComponentFixture<FixedManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
