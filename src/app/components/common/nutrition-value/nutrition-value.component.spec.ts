import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionValueComponent } from './nutrition-value.component';

describe('NutritionValueComponent', () => {
  let component: NutritionValueComponent;
  let fixture: ComponentFixture<NutritionValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
