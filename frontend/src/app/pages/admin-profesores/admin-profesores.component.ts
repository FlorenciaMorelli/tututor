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

  modalidades: string[] = ["En casa", "A domicilio", "Punto de encuentro"];

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
      }
    });
  }

  guardarProfesor (): void {
    let comp = this;
    if (this.profesoresForm.value.id_profesor) {
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
    this.profesoresService.getProfesorConIDProfesor(profesor.id_profesor)
      .subscribe({
        next : function (response: any) {
          comp.profesoresForm.setValue({
            id_profesor: response[0].id_profesor,
            id_usuario: response[0].id_usuario,
            nombre: response[0].nombre,
            apellido: response[0].apellido,
            modalidad: response[0].modalidad,
            zona: response[0].zona,
            direccion: response[0].direccion,
            foto_path: response[0].foto_path,
            archivos_path: response[0].archivos_path,
            puntuacion: response[0].puntuacion,
          });
        },
      });
  }

  borrar (profesor: Profesor): void {
    if (confirm("¿Estás seguro de que querés borrar este profesor? Se borrarán también los datos asociados a él. Esta acción es irreversible.")) {
      let comp = this;
      this.profesoresService.deleteProfesor(profesor.id_profesor)
        .subscribe({
          next : function () {
            if(comp.profesoresForm.value.id==profesor.id_profesor) {
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
