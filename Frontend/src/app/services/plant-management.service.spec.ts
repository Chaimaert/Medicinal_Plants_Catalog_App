import { TestBed } from '@angular/core/testing';

import { PlantManagementService } from './plant-management.service';

describe('PlantManagementService', () => {
  let service: PlantManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
