import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodNameComponent } from './food-name.component';

describe('FoodNameComponent', () => {
  let component: FoodNameComponent;
  let fixture: ComponentFixture<FoodNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
