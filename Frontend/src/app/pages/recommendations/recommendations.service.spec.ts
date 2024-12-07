import { TestBed } from '@angular/core/testing';

import { RecommendationService } from '../../services/recommendations.service';

describe('RecommendationsService', () => {
  let service: RecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
