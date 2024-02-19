import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlumnosComponent } from './search-alumnos.component';

describe('SearchAlumnosComponent', () => {
  let component: SearchAlumnosComponent;
  let fixture: ComponentFixture<SearchAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
