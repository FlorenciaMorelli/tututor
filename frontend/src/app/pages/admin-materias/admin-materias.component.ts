import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MateriasService } from '../../services/materias.service';
import { Materia } from '../../helpers/interfaces/materia';

@Component({
  selector: 'admin-materias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-materias.component.html',
  styleUrl: './admin-materias.component.css'
})
export class AdminMateriasComponent {
  private materiasService = inject(MateriasService);
  materias: Materia[] = [];

  materiasForm: FormGroup;

  constructor(private formBuilder: FormBuilder)
  {
    this.materiasForm = this.formBuilder.group({
      id_materia  : [null, []],
      nombre    : ['', [Validators.required]],
      icono    : ['', [Validators.required]],
    });
  }

  private cargarMaterias(): void {
    this.materiasService.getAllMaterias()
    .subscribe({
      next: (materiasResponse:any) => {
        this.materias = materiasResponse as Materia[];
        console.log("cargamos:" + materiasResponse);
      }, error: (error) => console.log("Error al cargar las materias: ", error)
    });
  }

  guardarMateria (): void {
    let comp = this;
    if (this.materiasForm.value.id_materia) {
      console.log("Vamos a editar: " + this.materiasForm.value.id_materia);
      this.materiasService.editarMateria(this.materiasForm.value.id_materia, this.materiasForm.value)
      .subscribe({
        next : function () {
          comp.cargarMaterias();
        },
      });
    } else {
      this.materiasService.postMateria(this.materiasForm.value)
      .subscribe({
        next : function () {
          comp.cargarMaterias();
        },
      });
    }
    this.descartarMateria();
  }

  descartarMateria(): void {
    this.materiasForm.setValue({
      id_materia: null,
      nombre: '',
      icono: '',
    });
  }

  editar (materia: Materia): void {
    let comp = this;
    this.materiasService.getMateriasConParametros(materia.id_materia)
      .subscribe({
        next : function (response: any) {
          comp.materiasForm.setValue({
            id_materia: response[0].id_materia,
            nombre: response[0].nombre,
            icono: response[0].icono,
          });
        },
      });
  }

  borrar (materia: Materia): void {
    if (confirm("¿Estás seguro de que querés borrar esta materia? Se borrarán también los datos asociados a ella. Esta acción es irreversible.")) {
      let comp = this;
      this.materiasService.deleteMateria(materia.id_materia)
        .subscribe({
          next : function () {
            if(comp.materiasForm.value.id==materia.id_materia) {
              comp.descartarMateria();
            }
            comp.cargarMaterias();
          },
        });
    }
  }

  ngOnInit () {
    let comp = this;
    comp.cargarMaterias();
  }
}
