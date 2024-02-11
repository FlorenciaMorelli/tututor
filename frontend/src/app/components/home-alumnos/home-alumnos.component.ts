import { Component } from '@angular/core';
import { AlumnosMateriasService } from '../../services/alumnos-materias.service';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'home-alumnos',
  standalone: true,
  imports: [CommonModule, SearchbarComponent],
  templateUrl: './home-alumnos.component.html',
  styleUrl: './home-alumnos.component.css'
})
export class HomeAlumnosComponent {
  materiasAlumno: any[] = [];

  constructor(private alumnosMateriasService: AlumnosMateriasService) {

  }

  ngOnInit(): void {
    this.alumnosMateriasService.getAlumnosMaterias().subscribe((materiasResponse:any) => {
      console.log('Respuesta del servicio getMaterias: ',materiasResponse);
      this.materiasAlumno=materiasResponse;
    });
  }
}
