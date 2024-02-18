import { Component } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { OffcanvasComponent } from '../../components/offcanvas/offcanvas.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, OffcanvasComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  zonas: string[] = ["CABA", "Bs As Zona Norte", "Bs As Zona Oeste", "Bs As Zona Sur", "Buenos Aires Interior"];
  modalidades: string[] = ["En casa", "A domicilio", "Punto de encuentro"];

  profesores: any[] = [];

  constructor(private profesoresService: ProfesoresService) {

  }

  ngOnInit(): void {
    this.profesoresService.getProfesores().subscribe((profesoresResponse:any) => {
      console.log('Respuesta del servicio getProfesores: ',profesoresResponse);
      this.profesores=profesoresResponse;
    });
  }
}
