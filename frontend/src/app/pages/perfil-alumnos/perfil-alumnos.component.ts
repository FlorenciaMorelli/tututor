import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosService } from '../../services/alumnos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'perfil-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-alumnos.component.html',
  styleUrl: './perfil-alumnos.component.css'
})
export class PerfilAlumnosComponent {
  private alumnosService = inject(AlumnosService);
  private idUsuario = Number(localStorage.getItem("id_user"));
  datosAlumno: any[] = [];

  perfilAlumno: FormGroup;

  editando: boolean = false;

  constructor(private formBuilder: FormBuilder){
    this.perfilAlumno = this.formBuilder.group({
      foto_path: ['', []],
      nombre: ['', [Validators.required]],
      apellido: ['', []],
      zona: ['', [Validators.required]],
      direccion: ['', []],
      puntuacion: [null, []],
      id_alumno: [null, []] ,
      id_usuario: [null, []] ,
    });
  }

  ngOnInit(){
    this.alumnosService.getAlumnosConParametros(this.idUsuario)
    .subscribe( (alumnoResponse: any)=>{
      console.log('Respuesta del servicio getAlumnosConParametros: ',alumnoResponse);
      this.datosAlumno =  alumnoResponse;
    });
  }

  editar(){
    let comp = this;
    if(!this.editando){
      this.editando = true;
      this.alumnosService.getAlumnosConParametros(this.idUsuario)
      .subscribe({
        next : function (response: any) {
          comp.perfilAlumno.setValue({
            foto_path: response.foto_path !== null ? response.foto_path : '../../../../assets/img/profilePic.png',
            nombre: response.nombre,
            apellido: response.apellido,
            zona: response.zona,
            direccion: response.direccion,
            puntuacion: response.puntuacion,
            id_alumno: response.id_alumno,
            id_usuario: response.id_usuario,
          });
        }
      })
    }
  }

  guardar(): void {
    if (this.perfilAlumno.value.id_alumno) {
      this.alumnosService.editarAlumno(this.perfilAlumno.value.id_alumno, this.perfilAlumno.value)
      .subscribe({
        next : function (response: any) {
          alert("Tu perfil ha sido editado!")
        },
      });
    }
    this.editando = false;
  }

  cancelar(): void {
    this.editando = false;
  }

}
