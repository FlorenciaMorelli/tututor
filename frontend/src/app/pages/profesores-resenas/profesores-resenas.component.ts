import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresService } from '../../services/profesores.service';
import { ProfesoresResenasService } from '../../services/profesores-resenas.service';

@Component({
  selector: 'profesores-resenas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesores-resenas.component.html',
  styleUrl: './profesores-resenas.component.css'
})
export class ProfesoresResenasComponent implements OnInit{
  resenasProfesor: any[] = [];
  idUsuario = 4 /* Number(localStorage.getItem("id_usuario")) */;
  idProfesor!: number;

  constructor(private profesoresResenasService: ProfesoresResenasService, private profesoresService: ProfesoresService){
    
  }

  ngOnInit(){
    this.profesoresService.getIDProfesor(this.idUsuario)
    .subscribe(
      (data: any) => {
        this.idProfesor = data.id_profesor;
        console.log(data.id_profesor);
      }
    )

    this.profesoresResenasService.getProfesoresResenasRecibidasConParametros(this.idUsuario).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getProfesoresResenasRecibidasConParametros: ',resenasResponse);
      this.resenasProfesor =  resenasResponse;
    });
  }
}
