import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { HowToComponent } from '../../components/how-to/how-to.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [BannerComponent, LoginFormComponent, HowToComponent, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  titulo = "TuTutor.com";
}