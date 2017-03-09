import { TestBed, inject } from '@angular/core/testing';

import { NbaAPIService } from './nba-api.service';

describe('NbaAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NbaAPIService]
    });
  });

  it('should ...', inject([NbaAPIService], (service: NbaAPIService) => {
    expect(service).toBeTruthy();
  }));
});
