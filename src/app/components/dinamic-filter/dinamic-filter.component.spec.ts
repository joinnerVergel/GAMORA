import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicFilterComponent } from './dinamic-filter.component';

describe('DinamicFilterComponent', () => {
  let component: DinamicFilterComponent;
  let fixture: ComponentFixture<DinamicFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
