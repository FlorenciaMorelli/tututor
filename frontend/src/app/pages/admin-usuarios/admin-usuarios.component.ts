import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent {
  usuarios: any[] = [];
  roles: string[] = ["Alumno", "Profesor", "Admin"];

  usuarioForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService)
    {
      this.usuarioForm = this.formBuilder.group({
        id_usuario  : [null, []],
        mail    : ['', [Validators.required]],
        rol : ['', [Validators.required]],
      });
    }

  private cargarUsuarios(): void {
    this.usuariosService.getAllUsuarios()
    .subscribe((usuariosResponse:any) => {
      this.usuarios = usuariosResponse;
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
    comp.cargarUsuarios();
  }
}
