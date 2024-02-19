import { Component, inject } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profesor } from '../../helpers/interfaces/profesor';

@Component({
  selector: 'admin-profesores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-profesores.component.html',
  styleUrl: './admin-profesores.component.css'
})
export class AdminProfesoresComponent {
  private profesoresService = inject(ProfesoresService);
  profesores: Profesor[] = [];
  profesoresForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder)
    {
      this.profesoresForm = this.formBuilder.group({
        id_profesor  : [null, []],
        id_usuario  : [null, []],
        nombre    : ['', [Validators.required]],
        apellido    : ['', [Validators.required]],
        zona    : ['', [Validators.required]],
        modalidad    : ['', [Validators.required]],
        direccion    : ['', []],
        foto_path    : ['', []],
        archivos_path    : ['', []],
        puntuacion    : [null, []],
      });
    }

  private cargarProfesores(): void {
    this.profesoresService.getAllProfesores()
    .subscribe({
      next: (profesoresResponse:any) => {
        this.profesores = profesoresResponse as Profesor[];
        console.log("cargamos:" + profesoresResponse);
      }, error: (error) => console.log("Error al cargar los profesores: ", error)
    });
  }

  guardarProfesor (): void {
    let comp = this;
    if (this.profesoresForm.value.id_profesor) {
      console.log("Vamos a editar: " + this.profesoresForm.value.id_profesor);
      this.profesoresService.editarProfesor(this.profesoresForm.value.id_profesor, this.profesoresForm.value)
      .subscribe({
        next : function () {
          comp.cargarProfesores();
        },
      });
    } else {
      this.profesoresService.postProfesor(this.profesoresForm.value)
      .subscribe({
        next : function () {
          comp.cargarProfesores();
        },
      });
    }
    this.descartarProfesor();
  }

  descartarProfesor(): void {
    this.profesoresForm.setValue({
      id_profesor: null,
      id_usuario: null,
      nombre: '',
      apellido: '',
      modalidad: '',
      zona: '',
      direccion: '',
      foto_path: '',
      archivos_path: '',
      puntuacion: null,
    });
  }

  editar (profesor: Profesor): void {
    let comp = this;
    this.profesoresService.getProfesoresConParametros(profesor.id_profesor)
      .subscribe({
        next : function (profesorResponse: Profesor) {
          comp.profesoresForm.setValue({
            id_profesor: profesorResponse.id_profesor,
            id_usuario: profesorResponse.id_usuario,
            nombre: profesorResponse.nombre,
            apellido: profesorResponse.apellido,
            modalidad: profesorResponse.modalidad,
            zona: profesorResponse.zona,
            direccion: profesorResponse.direccion,
            foto_path: profesorResponse.foto_path,
            archivos_path: profesorResponse.archivos_path,
            puntuacion: profesorResponse.puntuacion,
          });
        },
      });
  }

  borrar (profesor: Profesor): void {
    if (confirm("¿Estás seguro de que querés borrar este profesor? Se borrarán también los datos asociados a él. Esta acción es irreversible.")) {
      let comp = this;
      this.profesoresService.deleteProfesor(profesor.id_profesor)
        .subscribe({
          next : function (profesorResponse: Profesor) {
            if(comp.profesoresForm.value.id==profesorResponse.id_profesor) {
              comp.descartarProfesor();
            }
            comp.cargarProfesores();
          },
        });
    }
  }

  ngOnInit () {
    let comp = this;
    comp.cargarProfesores();
  }
}
