import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSearchInputComponent } from './food-search-input.component';

describe('FoodSearchInputComponent', () => {
  let component: FoodSearchInputComponent;
  let fixture: ComponentFixture<FoodSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodSearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
