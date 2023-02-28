import { TestBed } from '@angular/core/testing';

import { NomService } from './nom.service';

describe('NomService', () => {
  let service: NomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
