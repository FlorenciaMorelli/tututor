import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'banner',
  standalone: true,
  imports: [NavbarComponent, SearchbarComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  titulo = "¿Qué tienes que estudiar?";
}
