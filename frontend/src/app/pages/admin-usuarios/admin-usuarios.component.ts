import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../helpers/interfaces/usuario';

@Component({
  selector: 'admin-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent {
  private usuariosService = inject(UsuariosService);
  usuarios: Usuario[] = [];
  roles: string[] = ["Alumno", "Profesor", "Admin"];

  usuarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder)
  {
    this.usuarioForm = this.formBuilder.group({
      id_user  : [null, []],
      mail    : ['', [Validators.required, Validators.email]],
      rol : ['', [Validators.required]],
    });
  }

  private cargarUsuarios(): void {
    this.usuariosService.getAllUsuarios()
    .subscribe({
      next: (usuariosResponse:any) => {
        this.usuarios = usuariosResponse as Usuario[];
        console.log("cargamos:" + usuariosResponse);
      },
      error: (error: any) => console.log("Error al cargar los usuarios: ", error)
    });
  }

  guardarUsuario (): void {
    let comp = this;
    if (this.usuarioForm.value.id) {
      this.usuariosService.editarUsuario(this.usuarioForm.value.id, this.usuarioForm.value)
      .subscribe({
        next : function () {
          comp.cargarUsuarios();
        },
      });
    } else {
      this.usuariosService.postUsuario(this.usuarioForm.value)
      .subscribe({
        next : function () {
          comp.cargarUsuarios();
        },
      });
    }
    this.descartarUsuario();
  }

  descartarUsuario (): void {
    this.usuarioForm.setValue({
      id_user  : null,
      mail    : '',
      rol : ''
    });
  }

  editar (usuario: Usuario): void {
    let comp = this;
    this.usuariosService.getUsuariosConParametros(usuario.id_user)
      .subscribe({
        next : function (response: any) {
          comp.usuarioForm.setValue({
            id_user: response[0].id_user,
            mail: response[0].mail,
            rol: response[0].rol
          });
        },
      });
  }

  borrar (usuario: Usuario): void {
    if (confirm("¿Estás seguro de que querés borrar este usuario? Esta acción es irreversible")) {
      let comp = this;
      this.usuariosService.deleteUsuario(usuario.id_user)
        .subscribe({
          next : function () {
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
