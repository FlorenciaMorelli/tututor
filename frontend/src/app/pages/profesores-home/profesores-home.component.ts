import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresMateriasService } from '../../services/profesores-materias.service';
import { ProfesoresResenasService } from '../../services/profesores-resenas.service';
import { ProfesoresService } from '../../services/profesores.service';
import { Materia } from '../../helpers/interfaces/materia';
import { ResenaRecibidaDeAlumno } from '../../helpers/interfaces/resena-recibida-de-alumno';
import { ResenaDadaAAlumno } from '../../helpers/interfaces/resena-dada-a-alumno';

@Component({
  selector: 'profesores-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesores-home.component.html',
  styleUrl: './profesores-home.component.css'
})

export class ProfesoresHomeComponent {
  idUsuario = Number(localStorage.getItem("ID_USER"));

  materiasProfesor: Materia[] = [];
  resenasDadas: ResenaDadaAAlumno[] = [];
  resenasRecibidas: ResenaRecibidaDeAlumno[] = [];

  constructor(private profesoresService: ProfesoresService, private profesoresMateriasService: ProfesoresMateriasService, private profesoresResenasService: ProfesoresResenasService) {

  }

  ngOnInit(): void {
    this.profesoresMateriasService.getAllMateriasDelIDUsuario(this.idUsuario)
    .subscribe((materiasResponse:any) => {
      this.materiasProfesor = materiasResponse;
    });
    
    this.profesoresResenasService.getAllResenasDadasPorIDUsuario(this.idUsuario)
    .subscribe( (resenasResponse: any)=>{
      this.resenasDadas =  resenasResponse;
    });
    
    this.profesoresResenasService.getAllResenasRecibidasPorIDUsuario(this.idUsuario)
    .subscribe( (resenasResponse: any)=>{
      this.resenasRecibidas =  resenasResponse;
    });
  }
}
