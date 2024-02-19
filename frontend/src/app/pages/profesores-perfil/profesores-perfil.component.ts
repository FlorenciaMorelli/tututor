import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfesoresService } from '../../services/profesores.service';

@Component({
  selector: 'profesores-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesores-perfil.component.html',
  styleUrl: './profesores-perfil.component.css'
})
export class ProfesoresPerfilComponent {
  private idUsuario = 4 /* Number(localStorage.getItem("id_usuario")) */;
  datosProfesor: any[] = [];

  perfilProfesor: FormGroup;

  editando: boolean = false;

  constructor(private profesoresService: ProfesoresService, private formBuilder: FormBuilder){
    this.perfilProfesor = this.formBuilder.group({
      foto_path: ['', []],
      nombre: ['', [Validators.required]],
      apellido: ['', []],
      zona: ['', [Validators.required]],
      direccion: ['', []],
      puntuacion: [null, []],
      id_profesor: [null, []] ,
      id_usuario: [null, []] ,
    });
  }

  ngOnInit(){
    this.profesoresService.getProfesoresConParametros(this.idUsuario)
    .subscribe( (profesorResponse: any)=>{
      console.log('Respuesta del servicio getProfesoresConParametros: ',profesorResponse);
      this.datosProfesor =  profesorResponse;
    });
  }

  editar(){
    let comp = this;
    if(!this.editando){
      this.editando = true;
      this.profesoresService.getProfesoresConParametros(this.idUsuario)
      .subscribe({
        next : function (response: any) {
          comp.perfilProfesor.setValue({
            foto_path: response.foto_path !== null ? response.foto_path : '../../../../assets/img/profilePic.png',
            nombre: response.nombre,
            apellido: response.apellido,
            zona: response.zona,
            direccion: response.direccion,
            puntuacion: response.puntuacion,
            id_profesor: response.id_profesor,
            id_usuario: response.id_usuario,
          });
        }
      })
    }
  }

  guardar(): void {
    if (this.perfilProfesor.value.id_profesor) {
      this.profesoresService.editarProfesor(this.perfilProfesor.value.id_profesor, this.perfilProfesor.value)
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
