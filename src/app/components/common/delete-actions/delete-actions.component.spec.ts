import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActionsComponent } from './delete-actions.component';

describe('DeleteActionsComponent', () => {
  let component: DeleteActionsComponent;
  let fixture: ComponentFixture<DeleteActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
