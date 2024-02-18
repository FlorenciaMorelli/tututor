import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlumnosService } from '../../services/alumnos.service';
import { ProfesoresService } from '../../services/profesores.service';
import { MateriasService } from '../../services/materias.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminUsuariosComponent } from '../admin-usuarios/admin-usuarios.component';
import { AdminAlumnosComponent } from '../admin-alumnos/admin-alumnos.component';
import { AdminProfesoresComponent } from '../admin-profesores/admin-profesores.component';
import { AdminMateriasComponent } from '../admin-materias/admin-materias.component';

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
  profesores: any[] = [];
  materias: any[] = [];
  resenas: any[] = [];
  tabs: string[] = ["Usuarios", "Alumnos", "Profesores", "Materias"];
  tabActivo: string = "Usuarios";

  constructor (
      private http: HttpClient,
      private alumnosService: AlumnosService,
      private profesoresService: ProfesoresService,
      private materiasService: MateriasService,
      private router: Router)
  {
    
  }

  show(tab: string){
    this.tabActivo = tab;
  }
    

  restablecerBD (): void {
    let comp = this;
    if (confirm("¿Estás seguro de que querés restablecer la base de datos? ¡Esta acción es irreversible!")) {
      this.http.post('http://localhost/tututor/backend/restablecer', {})
        .subscribe({
          next : () => {
            this.router.navigate(['']);
          },
          error: err => {
            console.error('Error resetting database:', err);
          }
        });
    }
  }
  
  

  private cargarProfesores(): void {
    this.profesoresService.getAllProfesores()
    .subscribe((profesoresResponse:any) => {
      this.profesores = profesoresResponse;
    });
  }
  
  private cargarMaterias(): void {
    this.materiasService.getAllMaterias()
    .subscribe((materiasResponse:any) => {
      this.materias = materiasResponse;
    });
  }
}
