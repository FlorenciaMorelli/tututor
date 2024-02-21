import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../helpers/interfaces/profesor';

@Component({
  selector: 'profesores-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesores-perfil.component.html',
  styleUrl: './profesores-perfil.component.css'
})
export class ProfesoresPerfilComponent implements OnInit {
  idUsuario = Number(localStorage.getItem("ID_USER"));
  datosProfesor: Profesor[] = [];

  perfilProfesor: FormGroup;

  editando: boolean = false;

  constructor(private profesoresService: ProfesoresService, private formBuilder: FormBuilder){
    this.perfilProfesor = this.formBuilder.group({
      foto_path: ['', []],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      modalidad: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      direccion: ['', []],
      puntuacion: [null, []],
      id_profesor: [null, []] ,
      id_usuario: [null, []] ,
    });
  }

  ngOnInit(){
    this.profesoresService.getProfesorConIDUsuario(this.idUsuario)
    .subscribe( (profesorResponse: any) => {
      if (profesorResponse.length > 0) {
        const profesor = profesorResponse[0];
        this.perfilProfesor.setValue({
          foto_path: profesor.foto_path,
          nombre: profesor.nombre,
          apellido: profesor.apellido,
          zona: profesor.zona,
          direccion: profesor.direccion,
          modalidad: profesor.modalidad,
          puntuacion: profesor.puntuacion,
          id_profesor: profesor.id_profesor,
          id_usuario: profesor.id_usuario
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
        this.perfilProfesor.patchValue({
          foto_path: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
  

  guardar(): void {
    if (this.perfilProfesor.valid) {
      const profesorData = this.perfilProfesor.value;
      this.profesoresService.editarProfesor(profesorData.id_profesor, profesorData)
        .subscribe({
          next: (response: any) => {
            this.editando = false;
            this.perfilProfesor.patchValue(response);
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
