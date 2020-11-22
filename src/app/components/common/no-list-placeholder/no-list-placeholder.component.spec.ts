import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoListPlaceholderComponent } from './no-list-placeholder.component';

describe('NoListPlaceholderComponent', () => {
  let component: NoListPlaceholderComponent;
  let fixture: ComponentFixture<NoListPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoListPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoListPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
