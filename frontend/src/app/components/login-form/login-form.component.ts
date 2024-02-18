import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import * as bootstrap from 'bootstrap';
import { style } from '@angular/animations';


@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginObj: Login;
  mailValue: string = '<?php htmlspecialchars($_POST["mail"] ?? "") ?>';

  error = false;
  errorMessage = "<?php if(isset($_GET['error'])){$_GET['error']} ?>";

  constructor(private router: Router, private authService: AuthService) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.authService.login(this.loginObj)
    .subscribe(
      (data) =>{
        console.log("this.authService.login(this.loginObj) devolvió el observable: " + JSON.stringify(data));
        localStorage.setItem('loggedInUser', JSON.stringify({
            mail: data.mail,
            rol: data.rol,
            id_usuario: data.id_user
        }));
        const modalElement = document.getElementById('modalLoginToggle2');
        const backdropElement =  document.querySelectorAll('.modal-backdrop');
        if(modalElement && backdropElement){
          const modal = new bootstrap.Modal(modalElement);
          modal.dispose();
          backdropElement.forEach(element => element.remove());
        } else {
          console.log("Error al cerrar ventana del modal");
        }
        const dashboardRoute = data.rol === "profesor" ? 'dashboardProfesores' :
        data.rol === "alumno" ? 'dashboardAlumnos' : 'dashboardAdmin';
        this.router.navigate([dashboardRoute]);
        console.log("El rol es: " + data.rol + ". Navega a: " + dashboardRoute);
    },
      (err) => {
      console.log("Falló auth.service.login(" + this.loginObj + "). Error: " + err + ". Mensaje de error: " + err.message);
      this.error = true;
      this.errorMessage = "El mail o la contraseña son incorrectos.";
    })
  }
}

export class Login { 
  mail: string;
  password_hash: string;
  
  constructor() {
    this.mail = '';
    this.password_hash = '';
  } 
}