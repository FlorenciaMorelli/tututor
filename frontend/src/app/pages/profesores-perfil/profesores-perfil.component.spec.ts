import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresPerfilComponent } from './profesores-perfil.component';

describe('ProfesoresPerfilComponent', () => {
  let component: ProfesoresPerfilComponent;
  let fixture: ComponentFixture<ProfesoresPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoresPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
