import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasAlumnosComponent } from './resenas-alumnos.component';

describe('ResenasAlumnosComponent', () => {
  let component: ResenasAlumnosComponent;
  let fixture: ComponentFixture<ResenasAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenasAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenasAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
