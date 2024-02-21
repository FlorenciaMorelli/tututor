import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
        const id_user = data.id_user;
        const rol = data.rol;
        localStorage.setItem('ID_USER', id_user);
        localStorage.setItem('ROL', rol);
        localStorage.setItem('STATE', 'true');
        this.cerrarModal();
        if(rol === 'alumno'){
          this.router.navigate(['dashboardAlumnos']);
        } else if (rol === 'profesor'){
          this.router.navigate(['dashboardProfesores']);
        } else if (rol === 'admin'){
          this.router.navigate(['dashboardAdmin']);
        } else {
        }
    },
      (err) => {
      this.error = true;
      this.errorMessage = "El mail o la contraseña son incorrectos.";
    })
  }

  cerrarModal(){
    const modalElement = document.getElementById('modalLoginToggle2');
    const backdropElement =  document.querySelectorAll('.modal-backdrop');
    const bodyElement = document.getElementById('mybody');
    if(modalElement && backdropElement && bodyElement){
      const modal = new bootstrap.Modal(modalElement);
      modal.dispose();
      backdropElement.forEach(element => element.remove());
      bodyElement.removeAttribute('class');
      bodyElement.removeAttribute('style');
    } else {
    }
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