import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresService } from '../../services/profesores.service';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { CardProfesorComponent } from '../../components/card-profesor/card-profesor.component';
import { Profesor } from '../../helpers/interfaces/profesor';

@Component({
  selector: 'search-alumnos',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, CardProfesorComponent],
  templateUrl: './search-alumnos.component.html',
  styleUrl: './search-alumnos.component.css'
})
export class SearchAlumnosComponent {
  zonas: any[] = [
    {id: 1, nombre: "CABA", estado: false},
    {id: 2, nombre: "Bs As Zona Norte", estado: false},
    {id: 3, nombre: "Bs As Zona Oeste", estado: false},
    {id: 4, nombre: "Bs As Zona Sur", estado: false},
    {id: 5, nombre: "Buenos Aires Interior", estado: false}
  ];
  
  modalidades: string[] = ["En casa", "A domicilio", "Punto de encuentro"];

  profesores: Profesor[] = [];
  default: boolean = true;
  m: boolean = false;

  resultado: Profesor[] = [];

  constructor(private profesoresService: ProfesoresService) {

  }

  contactar(profesor: Profesor){
  }

  buscarPorZona(idZona: number){
    this.zonas.forEach(zona => {
      if(zona.id === idZona){
        if(zona.estado === false){
          zona.estado = true;
          this.profesores.forEach(profesor => {
            if(profesor.zona === zona.nombre){
              this.resultado.push(profesor);
              this.default = false;
            }
          });
        } else {
          zona.estado = false;
          this.profesores.forEach(profesor => {
            if(profesor.zona !== zona.nombre){
              this.resultado.push(profesor);
              this.default = false;
            }
          });
        }
      }
    })
  }
  
  buscarPorModalidad(modalidad: string){
    this.profesores.forEach(profesor => {
      if(profesor.zona === modalidad){
        this.resultado.push(profesor);
        this.default = false;
      }
    });
  }

  ngOnInit(): void {
    this.profesoresService.getAllProfesores()
    .subscribe(
      (profesoresResponse: any) => {
        this.profesores = profesoresResponse as Profesor[];
      }
    )
  }
}
