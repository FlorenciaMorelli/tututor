import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  titulo = "TuTutor.com";
  info: any[] = [
    {icon: "../../../../assets/icon/ubicacion.png", nombre: "Ubicacion", dato: "CABA, Argentina", link: ""},
    {icon: "../../../../assets/icon/mail.png", nombre: "Contacto", dato: "florenciamorelliIT@gmail.com", link: "mailto:florenciamorelliIT@gmail.com" }
  ]

}
