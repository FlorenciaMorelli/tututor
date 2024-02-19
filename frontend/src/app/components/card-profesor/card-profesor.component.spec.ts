import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfesorComponent } from './card-profesor.component';

describe('CardProfesorComponent', () => {
  let component: CardProfesorComponent;
  let fixture: ComponentFixture<CardProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
