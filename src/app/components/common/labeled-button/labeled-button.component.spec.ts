import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledButtonComponent } from './labeled-button.component';

describe('LabeledButtonComponent', () => {
  let component: LabeledButtonComponent;
  let fixture: ComponentFixture<LabeledButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabeledButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
