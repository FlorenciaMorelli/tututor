import { Component } from '@angular/core';
import { AlumnosMateriasService } from '../../services/alumnos-materias.service';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { AlumnosResenasService } from '../../services/alumnos-resenas.service';

@Component({
  selector: 'home-alumnos',
  standalone: true,
  imports: [CommonModule, SearchbarComponent],
  templateUrl: './home-alumnos.component.html',
  styleUrl: './home-alumnos.component.css'
})
export class HomeAlumnosComponent {
  materiasAlumno: any[] = [];
  resenasAlumno: any[] = [];

  constructor(private alumnosMateriasService: AlumnosMateriasService, private alumnosResenasService: AlumnosResenasService) {

  }

  ngOnInit(): void {
    this.alumnosMateriasService.getAlumnosMaterias().subscribe((materiasResponse:any) => {
      console.log('Respuesta del servicio getAlumnosMaterias: ',materiasResponse);
      this.materiasAlumno = materiasResponse;
    });
    
    this.alumnosResenasService.getAlumnosResenas().subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getAlumnosResenas: ',resenasResponse);
      this.resenasAlumno =  resenasResponse;
    });
  }
}
