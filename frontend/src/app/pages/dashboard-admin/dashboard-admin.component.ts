import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { AlumnosService } from '../../services/alumnos.service';
import { ProfesoresService } from '../../services/profesores.service';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit{
  usuarios: any[] = [];
  profesores: any[] = [];
  alumnos: any[] = [];
  materias: any[] = [];
  resenas: any[] = [];
  roles: string[] = ["Alumno", "Profesor", "Admin"];
  usuarioForm: FormGroup;

  constructor (
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private usuariosService: UsuariosService,
      private alumnosService: AlumnosService,
      private profesoresService: ProfesoresService,
      private materiasService: MateriasService)
  {
    this.usuarioForm = this.formBuilder.group({
      id_usuario  : [null, []],
      mail    : ['', [Validators.required]],
      rol : ['', [Validators.required]],
    });
  }

  restablecerBD (): void {
    let comp = this;
    if (confirm("¿Estás seguro de que querés restablecer la base de datos? ¡Esta acción es irreversible!")) {
      this.http.post('http://localhost/imparcial/src/api/restablecer', {})
        .subscribe({
          next : function (response) {
            comp.cargarUsuarios();
            comp.cargarAlumnos();
            comp.cargarProfesores();
            comp.cargarMaterias();
          },
        });
    }
  }

  private cargarUsuarios(): void {
    this.usuariosService.getAllUsuarios()
    .subscribe((usuariosResponse:any) => {
      this.usuarios = usuariosResponse;
    });
  }
  
  private cargarAlumnos(): void {
    this.alumnosService.getAllAlumnos()
    .subscribe((alumnosResponse:any) => {
      this.alumnos = alumnosResponse;
    });
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

  guardarUsuario (): void {
    let comp = this;
    if (this.usuarioForm.value.id) {
      this.usuariosService.editarUsuario(this.usuarioForm.value.id, this.usuarioForm.value)
      .subscribe({
        next : function (response: any) {
          comp.cargarUsuarios();
        },
      });
    } else {
      this.usuariosService.postUsuario(this.usuarioForm.value)
      .subscribe({
        next : function (response: any) {
          comp.cargarUsuarios();
        },
      });
    }
    this.descartarUsuario();
  }

  descartarUsuario (): void {
    this.usuarioForm.setValue({
      id_usuario  : null,
      mail    : '',
      rol : ''
    });
  }

  editar (usuario: any): void {
    let comp = this;
    this.usuariosService.getUsuariosConParametros(usuario.id_user)
      .subscribe({
        next : function (response: any) {
          comp.usuarioForm.setValue({
            id_usuario: response[0].id_user,
            mail: response[0].mail,
            rol: response[0].rol
          });
        },
      });
  }

  borrar (usuario: any): void {
    if (confirm("¿Estás seguro de que querés borrar este usuario? Esta acción es irreversible")) {
      let comp = this;
      this.usuariosService.deleteUsuario(usuario.id_user)
        .subscribe({
          next : function (response: any) {
            if(comp.usuarioForm.value.id==usuario.id_user) {
              comp.descartarUsuario();
            }
            comp.cargarUsuarios();
          },
        });
    }
  }

  ngOnInit () {
    let comp = this;
    this.cargarUsuarios();
  }

}
