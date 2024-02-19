import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfesoresComponent } from './admin-profesores.component';

describe('AdminProfesoresComponent', () => {
  let component: AdminProfesoresComponent;
  let fixture: ComponentFixture<AdminProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
