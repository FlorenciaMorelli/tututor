import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [BannerComponent, LoginFormComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  titulo = "TuTutor.com";
}