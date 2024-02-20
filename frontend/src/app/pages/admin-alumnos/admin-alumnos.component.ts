import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos.service';
import { CommonModule } from '@angular/common';
import { __values } from 'tslib';
import { Alumno } from '../../helpers/interfaces/alumno';

@Component({
  selector: 'admin-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-alumnos.component.html',
  styleUrl: './admin-alumnos.component.css'
})
export class AdminAlumnosComponent {
  private alumnosService = inject(AlumnosService);
  alumnos: Alumno[] = [];

  alumnosForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder)
    {
      this.alumnosForm = this.formBuilder.group({
        id_alumno  : [null, []],
        id_usuario  : [null, []],
        nombre    : ['', [Validators.required]],
        apellido    : ['', []],
        zona    : ['', [Validators.required]],
        direccion    : ['', []],
        foto_path    : ['', []],
        puntuacion    : [null, []],
      });
    }

  private cargarAlumnos(): void {
    this.alumnosService.getAllAlumnos()
    .subscribe({
      next: (alumnosResponse:any) => {
        this.alumnos = alumnosResponse as Alumno[];
        console.log("cargamos:" + alumnosResponse);
      }, error: (error) => console.log("Error al cargar los alumnos: ", error)
    });
  }

  guardarAlumno (): void {
    let comp = this;
    if (this.alumnosForm.value.id_alumno) {
      console.log("Vamos a editar: " + this.alumnosForm.value.id_alumno);
      this.alumnosService.editarAlumno(this.alumnosForm.value.id_alumno, this.alumnosForm.value)
      .subscribe({
        next : function () {
          comp.cargarAlumnos();
        },
      });
    } else {
      this.alumnosService.postAlumno(this.alumnosForm.value)
      .subscribe({
        next : function () {
          comp.cargarAlumnos();
        },
      });
    }
    this.descartarAlumno();
  }

  descartarAlumno(): void {
    this.alumnosForm.setValue({
      id_alumno: null,
      id_usuario: null,
      nombre: '',
      apellido: '',
      zona: '',
      direccion: '',
      foto_path: '',
      puntuacion: null,
    });
  }

  editar (alumno: Alumno): void {
    let comp = this;
    this.alumnosService.getAlumnosConParametros(alumno.id_alumno)
      .subscribe({
        next : function (response: any) {
          comp.alumnosForm.setValue({
            id_alumno: response[0].id_alumno,
            id_usuario: response[0].id_usuario,
            nombre: response[0].nombre,
            apellido: response[0].apellido,
            zona: response[0].zona,
            direccion: response[0].direccion,
            foto_path: response[0].foto_path,
            puntuacion: response[0].puntuacion,
          });
        },
      });
  }

  borrar (alumno: Alumno): void {
    if (confirm("¿Estás seguro de que querés borrar este alumno? Se borrarán también los datos asociados a él. Esta acción es irreversible.")) {
      let comp = this;
      this.alumnosService.deleteAlumno(alumno.id_alumno)
        .subscribe({
          next : function () {
            if(comp.alumnosForm.value.id==alumno.id_alumno) {
              comp.descartarAlumno();
            }
            comp.cargarAlumnos();
          },
        });
    }
  }

  ngOnInit () {
    let comp = this;
    comp.cargarAlumnos();
  }
}
