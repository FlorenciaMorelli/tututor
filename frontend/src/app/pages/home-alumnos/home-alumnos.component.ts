import { Component } from '@angular/core';
import { AlumnosMateriasService } from '../../services/alumnos-materias.service';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { AlumnosResenasService } from '../../services/alumnos-resenas.service';
import { Materia } from '../../helpers/interfaces/materia';
import { ResenaRecibidaDeProfesor } from '../../helpers/interfaces/resena-recibida-de-profesor';
import { ResenaRecibidaDeAlumno } from '../../helpers/interfaces/resena-recibida-de-alumno';
import { ResenaDadaAProfesor } from '../../helpers/interfaces/resena-dada-a-profesor';

@Component({
  selector: 'home-alumnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-alumnos.component.html',
  styleUrl: './home-alumnos.component.css'
})
export class HomeAlumnosComponent {
  idUsuario = Number(localStorage.getItem("ID_USER"));

  materiasAlumno: Materia[] = [];
  resenasDadas: ResenaDadaAProfesor[] = [];
  resenasRecibidas: ResenaRecibidaDeProfesor[] = [];

  constructor(private alumnosMateriasService: AlumnosMateriasService, private alumnosResenasService: AlumnosResenasService) {

  }

  ngOnInit(): void {
    this.alumnosMateriasService.getAllMateriasDelIDUsuario(this.idUsuario).subscribe((materiasResponse:any) => {
      console.log('Respuesta del servicio getAlumnosMaterias: ',materiasResponse);
      this.materiasAlumno = materiasResponse;
    });
    
    this.alumnosResenasService.getAllResenasDadasPorIDUsuario(this.idUsuario).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getAllResenasDadasPorIDAlumno: ',resenasResponse);
      this.resenasDadas =  resenasResponse;
    });

    this.alumnosResenasService.getAllResenasRecibidasPorIDUsuario(this.idUsuario).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getAllResenasRecibidasPorIDAlumno: ',resenasResponse);
      this.resenasRecibidas =  resenasResponse;
    });
  }
}
