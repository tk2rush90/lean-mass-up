import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionWaveComponent } from './nutrition-wave.component';

describe('NutritionWaveComponent', () => {
  let component: NutritionWaveComponent;
  let fixture: ComponentFixture<NutritionWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionWaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
