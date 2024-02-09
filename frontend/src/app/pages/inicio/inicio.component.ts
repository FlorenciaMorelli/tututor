import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { LoginFormComponent } from '../login-form/login-form.component';

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