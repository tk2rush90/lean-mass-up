import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDateSelectorComponent } from './record-date-selector.component';

describe('RecordDateSelectorComponent', () => {
  let component: RecordDateSelectorComponent;
  let fixture: ComponentFixture<RecordDateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordDateSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
