import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveBackgroundComponent } from './wave-background.component';

describe('WaveBackgroundComponent', () => {
  let component: WaveBackgroundComponent;
  let fixture: ComponentFixture<WaveBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaveBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
