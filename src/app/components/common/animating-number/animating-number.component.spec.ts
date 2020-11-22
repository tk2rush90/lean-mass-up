import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatingNumberComponent } from './animating-number.component';

describe('AnimatingNumberComponent', () => {
  let component: AnimatingNumberComponent;
  let fixture: ComponentFixture<AnimatingNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatingNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
