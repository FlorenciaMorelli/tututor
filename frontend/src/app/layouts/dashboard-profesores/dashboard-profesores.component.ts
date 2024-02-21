import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfesoresHomeComponent } from '../../pages/profesores-home/profesores-home.component';
import { ProfesoresResenasComponent } from '../../pages/profesores-resenas/profesores-resenas.component';
import { ProfesoresPerfilComponent } from '../../pages/profesores-perfil/profesores-perfil.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-profesores',
  standalone: true,
  imports: [CommonModule, ProfesoresHomeComponent, ProfesoresResenasComponent, ProfesoresPerfilComponent],
  templateUrl: './dashboard-profesores.component.html',
  styleUrl: './dashboard-profesores.component.css'
})
export class DashboardProfesoresComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  nombre: string = String(localStorage.getItem('nombre'));
  profilePic: string = String(localStorage.getItem('foto_path'));

  secciones: any[] = [
    {src: "../../../assets/icon/home.png", nombre: "Inicio", tag: "inicio"},
    {src: "../../../assets/icon/reviews.png", nombre: "Reseñas", tag: "resenas"},
    {src: "../../../assets/icon/profile.png", nombre: "Perfil", tag: "perfil"}
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
