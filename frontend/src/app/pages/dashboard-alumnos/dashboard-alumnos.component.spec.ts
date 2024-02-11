import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAlumnosComponent } from './dashboard-alumnos.component';

describe('DashboardAlumnosComponent', () => {
  let component: DashboardAlumnosComponent;
  let fixture: ComponentFixture<DashboardAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
