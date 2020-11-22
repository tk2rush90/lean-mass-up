import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionActionsComponent } from './nutrition-actions.component';

describe('NutritionActionsComponent', () => {
  let component: NutritionActionsComponent;
  let fixture: ComponentFixture<NutritionActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
