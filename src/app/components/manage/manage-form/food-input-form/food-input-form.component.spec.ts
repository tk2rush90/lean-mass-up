import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInputFormComponent } from './food-input-form.component';

describe('FoodInputFormComponent', () => {
  let component: FoodInputFormComponent;
  let fixture: ComponentFixture<FoodInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodInputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
