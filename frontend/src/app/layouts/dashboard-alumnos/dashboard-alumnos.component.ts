import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAlumnosComponent } from '../../pages/home-alumnos/home-alumnos.component';
import { SearchAlumnosComponent } from '../../pages/search-alumnos/search-alumnos.component';
import { ResenasAlumnosComponent } from '../../pages/resenas-alumnos/resenas-alumnos.component';
import { PerfilAlumnosComponent } from '../../pages/perfil-alumnos/perfil-alumnos.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'dashboard-alumnos',
  standalone: true,
  imports: [CommonModule, HomeAlumnosComponent, SearchAlumnosComponent, ResenasAlumnosComponent, PerfilAlumnosComponent],
  templateUrl: './dashboard-alumnos.component.html',
  styleUrl: './dashboard-alumnos.component.css'
})
export class DashboardAlumnosComponent {
  idUsuario: number = Number((localStorage.getItem('ID_USER')));
  nombre: string = '';
  profilePic: string = '';

  secciones: any[] = [
    {src: "../../../assets/icon/home.png", nombre: "Inicio", tag: "inicio"},
    {src: "../../../assets/icon/search.png", nombre: "Buscar", tag: "buscar"},
    {src: "../../../assets/icon/reviews.png", nombre: "Mis reseñas", tag: "resenas"},
    {src: "../../../assets/icon/profile.png", nombre: "Mi perfil", tag: "perfil"}
  ];
  seccionActiva: string = "inicio";

  constructor(private authService: AuthService, private router: Router, private alumnosService: AlumnosService){
    this.cargarNombreYFoto();
  }

  cargarNombreYFoto() {
    this.alumnosService.getAlumnoConIDUsuario(this.idUsuario)
    .subscribe({
      next: (alumno: any) => {
        this.nombre = alumno[0].nombre;
        this.profilePic = alumno[0].foto_path;
      }
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  show(seccion: string){
    this.seccionActiva = seccion;
  }
}
