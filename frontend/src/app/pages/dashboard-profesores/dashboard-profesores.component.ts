import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfesoresHomeComponent } from '../profesores-home/profesores-home.component';
import { ProfesoresResenasComponent } from '../profesores-resenas/profesores-resenas.component';
import { ProfesoresPerfilComponent } from '../profesores-perfil/profesores-perfil.component';

@Component({
  selector: 'app-dashboard-profesores',
  standalone: true,
  imports: [CommonModule, ProfesoresHomeComponent, ProfesoresResenasComponent, ProfesoresPerfilComponent],
  templateUrl: './dashboard-profesores.component.html',
  styleUrl: './dashboard-profesores.component.css'
})
export class DashboardProfesoresComponent {
  secciones: any[] = [
    {src: "../../../assets/icon/home.png", nombre: "Inicio", tag: "inicio"},
    {src: "../../../assets/icon/reviews.png", nombre: "Reseñas", tag: "resenas"},
    {src: "../../../assets/icon/profile.png", nombre: "Perfil", tag: "perfil"}
  ];
  seccionActiva: string = "inicio";

  show(seccion: string){
    this.seccionActiva = seccion;
  }
}
