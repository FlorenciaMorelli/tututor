import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminUsuariosComponent } from '../../pages/admin-usuarios/admin-usuarios.component';
import { AdminAlumnosComponent } from '../../pages/admin-alumnos/admin-alumnos.component';
import { AdminProfesoresComponent } from '../../pages/admin-profesores/admin-profesores.component';
import { AdminMateriasComponent } from '../../pages/admin-materias/admin-materias.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    AdminUsuariosComponent,
    AdminAlumnosComponent,
    AdminProfesoresComponent,
    AdminMateriasComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})

export class DashboardAdminComponent{
  private authService = inject(AuthService);
  private router = inject(Router);

  profesores: any[] = [];
  materias: any[] = [];
  resenas: any[] = [];
  tabs: string[] = ["Usuarios", "Alumnos", "Profesores", "Materias"];
  tabActivo: string = "Usuarios";

  constructor (
      private http: HttpClient)
  {
    
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  show(tab: string){
    this.tabActivo = tab;
  }
  
  actualizar(){
    location.reload();
  }

  restablecerBD (): void {
    let comp = this;
    if (confirm("¿Estás seguro de que querés restablecer la base de datos? ¡Esta acción es irreversible!")) {
      this.http.post('http://localhost/tututor/backend/restablecer', '')
        .subscribe({
          next : () => {
            this.actualizar();
          },
          error: err => {
            console.error('Error resetting database:', err);
          }
        });
    }
  }
}
