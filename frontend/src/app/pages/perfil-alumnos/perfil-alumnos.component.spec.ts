import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAlumnosComponent } from './perfil-alumnos.component';

describe('PerfilAlumnosComponent', () => {
  let component: PerfilAlumnosComponent;
  let fixture: ComponentFixture<PerfilAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
