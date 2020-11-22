import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordInputFormComponent } from './record-input-form.component';

describe('RecordInputFormComponent', () => {
  let component: RecordInputFormComponent;
  let fixture: ComponentFixture<RecordInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordInputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
