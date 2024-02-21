import { TestBed } from '@angular/core/testing';

import { ProfesoresMateriasService } from './profesores-materias.service';

describe('ProfesoresMateriasService', () => {
  let service: ProfesoresMateriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesoresMateriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
