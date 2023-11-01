import { TestBed } from '@angular/core/testing';

import { GenerateNextService } from './generate-next.service';

describe('GenerateNextService', () => {
  let service: GenerateNextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateNextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
