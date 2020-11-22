import { TestBed } from '@angular/core/testing';

import { ArchivedFoodDataService } from './archived-food-data.service';

describe('ArchivedFoodDataService', () => {
  let service: ArchivedFoodDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivedFoodDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
