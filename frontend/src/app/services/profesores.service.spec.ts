import { TestBed } from '@angular/core/testing';

import { ProfesoresService } from './profesores.service';

describe('ProfesoresService', () => {
  let service: ProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
