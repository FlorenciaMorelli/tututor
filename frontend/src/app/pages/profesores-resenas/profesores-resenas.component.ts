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
  idUsuario = Number(localStorage.getItem("ID_USER"));
  idProfesor!: number;

  constructor(private profesoresResenasService: ProfesoresResenasService, private profesoresService: ProfesoresService){
    
  }

  ngOnInit(){
    this.profesoresService.getProfesorConIDUsuario(this.idUsuario)
    .subscribe(
      (data: any) => {
        this.idProfesor = data.id_profesor;
        console.log(data.id_profesor);
      }
    )

    this.profesoresResenasService.getAllResenasRecibidasPorIDUsuario(this.idUsuario).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getAllResenasRecibidasPorIDProfesor: ',resenasResponse);
      this.resenasProfesor =  resenasResponse;
    });
  }
}
