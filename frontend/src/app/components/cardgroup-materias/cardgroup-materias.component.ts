import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasService } from '../../services/materias.service';

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
    this.materiasService.getAllMaterias().subscribe((materiasResponse:any) => {
      this.materias=materiasResponse;
    });
  }
}