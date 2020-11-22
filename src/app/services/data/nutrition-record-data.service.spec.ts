import { TestBed } from '@angular/core/testing';

import { NutritionRecordDataService } from './nutrition-record-data.service';

describe('NutritionRecordService', () => {
  let service: NutritionRecordDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionRecordDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
