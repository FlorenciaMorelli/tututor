import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosService } from '../../services/alumnos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alumno } from '../../helpers/interfaces/alumno';

@Component({
  selector: 'perfil-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-alumnos.component.html',
  styleUrl: './perfil-alumnos.component.css'
})
export class PerfilAlumnosComponent {
  idUsuario = Number(localStorage.getItem("ID_USER"));
  datosAlumno: Alumno[] = [];

  perfilAlumno: FormGroup;

  editando: boolean = false;

  constructor(private formBuilder: FormBuilder, private alumnosService: AlumnosService){
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
    this.alumnosService.getAlumnoConIDUsuario(this.idUsuario)
    .subscribe( (alumnoResponse: any)=>{
      if (alumnoResponse.length > 0) {
        const alumno = alumnoResponse[0];
        this.perfilAlumno.setValue({
          foto_path: alumno.foto_path,
          nombre: alumno.nombre,
          apellido: alumno.apellido,
          zona: alumno.zona,
          direccion: alumno.direccion,
          modalidad: alumno.modalidad,
          puntuacion: alumno.puntuacion,
          id_alumno: alumno.id_alumno,
          id_usuario: alumno.id_usuario
        });
      } else {
      }
    });
  }

  editar(){
    this.editando = true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.perfilAlumno.patchValue({
          foto_path: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  guardar(): void {
    if (this.perfilAlumno.valid) {
      const alumnoData = this.perfilAlumno.value;
      this.alumnosService.editarAlumno(alumnoData.id_alumno, alumnoData)
        .subscribe({
          next: (response: any) => {
            this.editando = false;
            this.perfilAlumno.patchValue(response);
          },
          error: (error: any) => {
          }
        });
    } else {
    }
  }

  cancelar(): void {
    this.editando = false;
  }

}
