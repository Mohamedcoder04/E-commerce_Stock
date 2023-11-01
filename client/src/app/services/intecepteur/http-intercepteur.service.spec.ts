import { TestBed } from '@angular/core/testing';

import { HttpIntercepteurService } from './http-intercepteur.service';

describe('HttpIntercepteurService', () => {
  let service: HttpIntercepteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIntercepteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
