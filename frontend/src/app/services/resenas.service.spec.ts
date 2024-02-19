import { TestBed } from '@angular/core/testing';

import { ResenasService } from './resenas.service';

describe('ResenasService', () => {
  let service: ResenasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResenasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
