import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredCaloriesComponent } from './required-calories.component';

describe('RequiredCaloriesComponent', () => {
  let component: RequiredCaloriesComponent;
  let fixture: ComponentFixture<RequiredCaloriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredCaloriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
