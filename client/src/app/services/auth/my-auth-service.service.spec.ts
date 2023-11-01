import { TestBed } from '@angular/core/testing';

import { MyAuthService } from './my-auth.service';

describe('MyAuthServiceService', () => {
  let service: MyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
