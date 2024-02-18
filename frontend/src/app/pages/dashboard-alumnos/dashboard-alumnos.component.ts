import { Component } from '@angular/core';
import { OffcanvasComponent } from '../../components/offcanvas/offcanvas.component';
import { HomeAlumnosComponent } from '../../components/home-alumnos/home-alumnos.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'dashboard-alumnos',
  standalone: true,
  imports: [OffcanvasComponent, HomeAlumnosComponent, SearchbarComponent],
  templateUrl: './dashboard-alumnos.component.html',
  styleUrl: './dashboard-alumnos.component.css'
})
export class DashboardAlumnosComponent {
  
}
