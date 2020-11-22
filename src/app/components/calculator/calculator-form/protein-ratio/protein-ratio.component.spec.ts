import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinRatioComponent } from './protein-ratio.component';

describe('ProteinRatioComponent', () => {
  let component: ProteinRatioComponent;
  let fixture: ComponentFixture<ProteinRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProteinRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
