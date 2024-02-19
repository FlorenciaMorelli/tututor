import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresMateriasService } from '../../services/profesores-materias.service';
import { ProfesoresResenasService } from '../../services/profesores-resenas.service';
import { ProfesoresService } from '../../services/profesores.service';

@Component({
  selector: 'profesores-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesores-home.component.html',
  styleUrl: './profesores-home.component.css'
})
export class ProfesoresHomeComponent {
  idUsuario = 4 /* Number(localStorage.getItem("id_usuario")) */;
  idProfesor!: number;

  materiasProfesor: any[] = [];
  resenasDadas: any[] = [];
  resenasRecibidas: any[] = [];

  constructor(private profesoresService: ProfesoresService, private profesoresMateriasService: ProfesoresMateriasService, private profesoresResenasService: ProfesoresResenasService) {

  }

  ngOnInit(): void {
    this.profesoresService.getIDProfesor(this.idUsuario)
    .subscribe(
      (data: any) => {
        this.idProfesor = data.id_profesor;
      }
    )

    this.profesoresMateriasService.getProfesoresMaterias(this.idProfesor).subscribe((materiasResponse:any) => {
      console.log('Respuesta del servicio getProfesoresMaterias: ',materiasResponse);
      this.materiasProfesor = materiasResponse;
    });
    
    this.profesoresResenasService.getProfesoresResenasDadasConParametros(this.idProfesor).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getProfesoresResenas: ',resenasResponse);
      this.resenasDadas =  resenasResponse;
    });
    
    this.profesoresResenasService.getProfesoresResenasRecibidasConParametros(this.idProfesor).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getProfesoresResenas: ',resenasResponse);
      this.resenasRecibidas =  resenasResponse;
    });
  }
}
