import { Component } from '@angular/core';

@Component({
  selector: 'searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  placeholder: String = "Busca por materia o nombre";
}
