import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionStatusValueComponent } from './nutrition-status-value.component';

describe('NutritionStatusValueComponent', () => {
  let component: NutritionStatusValueComponent;
  let fixture: ComponentFixture<NutritionStatusValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionStatusValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionStatusValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
