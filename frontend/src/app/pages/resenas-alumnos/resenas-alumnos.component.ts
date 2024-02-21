import { Component, OnInit } from '@angular/core';
import { AlumnosResenasService } from '../../services/alumnos-resenas.service';
import { CommonModule } from '@angular/common';
import { ResenaRecibidaDeProfesor } from '../../helpers/interfaces/resena-recibida-de-profesor';

@Component({
  selector: 'resenas-alumnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenas-alumnos.component.html',
  styleUrl: './resenas-alumnos.component.css'
})
export class ResenasAlumnosComponent implements OnInit {
  resenasAlumno: ResenaRecibidaDeProfesor[] = [];
  idUsuario = Number(localStorage.getItem("ID_USER"));

  constructor(private alumnosResenasService: AlumnosResenasService){
  }

  ngOnInit(){
    this.alumnosResenasService.getAllResenasRecibidasPorIDUsuario(this.idUsuario).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getAlumnosResenas: ',resenasResponse);
      this.resenasAlumno =  resenasResponse;
    });
  }
}
