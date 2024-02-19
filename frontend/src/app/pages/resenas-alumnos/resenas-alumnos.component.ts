import { Component, OnInit } from '@angular/core';
import { AlumnosResenasService } from '../../services/alumnos-resenas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'resenas-alumnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenas-alumnos.component.html',
  styleUrl: './resenas-alumnos.component.css'
})
export class ResenasAlumnosComponent implements OnInit {
  resenasAlumno: any[] = [];
  idUsuario = Number(localStorage.getItem("id_user"));

  constructor(private alumnosResenasService: AlumnosResenasService){
  }

  ngOnInit(){
    this.alumnosResenasService.getAlumnosresenasConParametros(this.idUsuario).subscribe( (resenasResponse: any)=>{
      console.log('Respuesta del servicio getAlumnosResenas: ',resenasResponse);
      this.resenasAlumno =  resenasResponse;
    });
  }
}
