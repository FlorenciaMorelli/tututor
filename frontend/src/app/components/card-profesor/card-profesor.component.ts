import { Component } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';

@Component({
  selector: 'app-card-profesor',
  standalone: true,
  imports: [],
  templateUrl: './card-profesor.component.html',
  styleUrl: './card-profesor.component.css'
})
export class CardProfesorComponent {
  idProfesor: number = 1;
  profesor: any;
  
  constructor(private profesoresService: ProfesoresService) {
  }

  show(id :number){
    this.idProfesor = id;
  }

  ngOnInit(): void {
    this.profesoresService.getProfesorConIDProfesor(this.idProfesor).subscribe((profesorResponse:any) => {
      console.log('Respuesta del servicio getMaterias: ',profesorResponse);
      this.profesor=profesorResponse;
    });
  }
}
