import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfilledNutritionListComponent } from './fulfilled-nutrition-list.component';

describe('FulfilledNutritionListComponent', () => {
  let component: FulfilledNutritionListComponent;
  let fixture: ComponentFixture<FulfilledNutritionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfilledNutritionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FulfilledNutritionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
