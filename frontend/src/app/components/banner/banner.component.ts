import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CardgroupMateriasComponent } from "../cardgroup-materias/cardgroup-materias.component";

@Component({
  selector: 'banner',
  standalone: true,
  imports: [NavbarComponent, SearchbarComponent, CardgroupMateriasComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  titulo = "¿Qué tienes que estudiar?";
}
