import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresHomeComponent } from './profesores-home.component';

describe('ProfesoresHomeComponent', () => {
  let component: ProfesoresHomeComponent;
  let fixture: ComponentFixture<ProfesoresHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoresHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
