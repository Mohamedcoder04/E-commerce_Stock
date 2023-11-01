import { TestBed } from '@angular/core/testing';

import { EmployeGuardService } from './employe-guard.service';

describe('EmployerGuardService', () => {
  let service: EmployeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
