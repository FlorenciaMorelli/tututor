import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAlumnosComponent } from '../../pages/home-alumnos/home-alumnos.component';
import { SearchAlumnosComponent } from '../../pages/search-alumnos/search-alumnos.component';
import { ResenasAlumnosComponent } from '../../pages/resenas-alumnos/resenas-alumnos.component';
import { PerfilAlumnosComponent } from '../../pages/perfil-alumnos/perfil-alumnos.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-alumnos',
  standalone: true,
  imports: [CommonModule, HomeAlumnosComponent, SearchAlumnosComponent, ResenasAlumnosComponent, PerfilAlumnosComponent],
  templateUrl: './dashboard-alumnos.component.html',
  styleUrl: './dashboard-alumnos.component.css'
})
export class DashboardAlumnosComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  nombre: string = String(localStorage.getItem('nombre'));
  profilePic: string = String(localStorage.getItem('foto_path'));

  secciones: any[] = [
    {src: "../../../assets/icon/home.png", nombre: "Inicio", tag: "inicio"},
    {src: "../../../assets/icon/messages.png", nombre: "Buscar", tag: "buscar"},
    {src: "../../../assets/icon/reviews.png", nombre: "Mis reseñas", tag: "resenas"},
    {src: "../../../assets/icon/profile.png", nombre: "Mi perfil", tag: "perfil"}
  ];
  seccionActiva: string = "inicio";

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  show(seccion: string){
    this.seccionActiva = seccion;
  }
}
