import { TestBed } from '@angular/core/testing';

import { AlumnosResenasService } from './alumnos-resenas.service';

describe('AlumnosResenasService', () => {
  let service: AlumnosResenasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosResenasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
