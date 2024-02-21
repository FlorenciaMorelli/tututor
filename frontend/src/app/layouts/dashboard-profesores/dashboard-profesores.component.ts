import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfesoresHomeComponent } from '../../pages/profesores-home/profesores-home.component';
import { ProfesoresResenasComponent } from '../../pages/profesores-resenas/profesores-resenas.component';
import { ProfesoresPerfilComponent } from '../../pages/profesores-perfil/profesores-perfil.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../helpers/interfaces/usuario';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../helpers/interfaces/profesor';

@Component({
  selector: 'app-dashboard-profesores',
  standalone: true,
  imports: [CommonModule, ProfesoresHomeComponent, ProfesoresResenasComponent, ProfesoresPerfilComponent],
  templateUrl: './dashboard-profesores.component.html',
  styleUrl: './dashboard-profesores.component.css'
})
export class DashboardProfesoresComponent {
  idUsuario: number = Number((localStorage.getItem('ID_USER')));
  nombre: string = '';
  profilePic: string = '';

  secciones: any[] = [
    {src: "../../../assets/icon/home.png", nombre: "Inicio", tag: "inicio"},
    {src: "../../../assets/icon/reviews.png", nombre: "Reseñas", tag: "resenas"},
    {src: "../../../assets/icon/profile.png", nombre: "Perfil", tag: "perfil"}
  ];
  seccionActiva: string = "inicio";

  constructor(private authService: AuthService, private router: Router, private profesoresService: ProfesoresService){
    this.cargarNombreYFoto();
  }

  cargarNombreYFoto() {
    this.profesoresService.getProfesorConIDUsuario(this.idUsuario)
    .subscribe({
      next: (profesor: any) => {
        this.nombre = profesor[0].nombre;
        this.profilePic = profesor[0].foto_path;
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
