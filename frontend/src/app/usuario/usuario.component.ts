import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  usuarios = [
    {
      id: 1,
      username: 'Florencia'
    },
    {
      id: 2,
      username: 'Matias'
    },
    {
      id: 3,
      username: 'Juan'
    }
  ]
  
  @Input() usuarioActual = "";

  marcarUsuario(username: string){
    this.usuarioActual = username;
  }

  isLoggedIn = false;

  greet(){
    alert("Hola!");
  }
}
