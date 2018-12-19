import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptMessageComponent } from './script-message.component';

describe('ScriptMessageComponent', () => {
  let component: ScriptMessageComponent;
  let fixture: ComponentFixture<ScriptMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
