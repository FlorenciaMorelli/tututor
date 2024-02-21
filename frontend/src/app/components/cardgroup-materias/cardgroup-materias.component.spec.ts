import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardgroupMateriasComponent } from './cardgroup-materias.component';

describe('CardgroupMateriasComponent', () => {
  let component: CardgroupMateriasComponent;
  let fixture: ComponentFixture<CardgroupMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardgroupMateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardgroupMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
