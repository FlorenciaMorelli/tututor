import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, SignupFormComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  titulo = "TuTutor.com";

  menu = [
    {
      texto: 'Home',
      link:  '/',
      tipo: 1
    },
    {
      texto: 'Cómo funciona',
      link: '/howto',
      tipo: 1
    },
    {
      texto: 'Quiero aprender',
      link: '/login',
      tipo: 2
    },
    {
      texto: 'Quiero enseñar',
      link: '/login',
      tipo: 3
    }
  ]
}
