import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopHintComponent } from './pop-hint.component';

describe('PopHintComponent', () => {
  let component: PopHintComponent;
  let fixture: ComponentFixture<PopHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
