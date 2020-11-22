import { TestBed } from '@angular/core/testing';

import { FoodRecordDataService } from './food-record-data.service';

describe('FoodRecordDataService', () => {
  let service: FoodRecordDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodRecordDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
