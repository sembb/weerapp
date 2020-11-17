import { TestBed } from '@angular/core/testing';

import { WeerService } from './weer.service';

describe('WeerService', () => {
  let service: WeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
