import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFormHeaderComponent } from './record-form-header.component';

describe('RecordFormHeaderComponent', () => {
  let component: RecordFormHeaderComponent;
  let fixture: ComponentFixture<RecordFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordFormHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
