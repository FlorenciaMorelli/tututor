import { Component, Input, input } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../helpers/interfaces/profesor';

@Component({
  selector: 'app-card-profesor',
  standalone: true,
  imports: [],
  templateUrl: './card-profesor.component.html',
  styleUrl: './card-profesor.component.css'
})
export class CardProfesorComponent {
  profesor: Profesor[] = [];
  @Input() idProfesor!: number;

  constructor(private profesoresService: ProfesoresService) {

  }

  show(id :number){
    this.idProfesor = id;
  }

  ngOnInit(): void {
    this.profesoresService.getProfesorConIDProfesor(this.idProfesor).subscribe((profesorResponse:any) => {
      this.profesor=profesorResponse;
    });
  }
}
