import { TestBed } from '@angular/core/testing';

import { AlumnosMateriasService } from './alumnos-materias.service';

describe('AlumnosMateriasService', () => {
  let service: AlumnosMateriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosMateriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
