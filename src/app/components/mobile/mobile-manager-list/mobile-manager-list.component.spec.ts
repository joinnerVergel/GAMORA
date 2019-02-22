import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileManagerListComponent } from './mobile-manager-list.component';

describe('MobileManagerListComponent', () => {
  let component: MobileManagerListComponent;
  let fixture: ComponentFixture<MobileManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
