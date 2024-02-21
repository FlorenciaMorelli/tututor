import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresResenasComponent } from './profesores-resenas.component';

describe('ProfesoresResenasComponent', () => {
  let component: ProfesoresResenasComponent;
  let fixture: ComponentFixture<ProfesoresResenasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoresResenasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
