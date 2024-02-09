import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasService } from '../../materias.service';

@Component({
  selector: 'cardgroup-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardgroup-materias.component.html',
  styleUrl: './cardgroup-materias.component.css'
})
export class CardgroupMateriasComponent implements OnInit{

  materias: any[] = [];

  constructor(private materiasService: MateriasService) {

  }

  ngOnInit(): void {
    this.materiasService.getMaterias().subscribe((materiasResponse:any) => {
      console.log('Respuesta del servicio getMaterias: ',materiasResponse);
      this.materias=materiasResponse;
    });
  }
}