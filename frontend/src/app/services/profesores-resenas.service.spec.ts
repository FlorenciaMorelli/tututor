import { TestBed } from '@angular/core/testing';

import { ProfesoresResenasService } from './profesores-resenas.service';

describe('ProfesoresResenasService', () => {
  let service: ProfesoresResenasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesoresResenasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
