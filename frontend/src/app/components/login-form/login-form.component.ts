import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
    if(this.authService.login(this.loginObj)){
      localStorage.setItem('loggedInUser', JSON.stringify(this.loginObj));
      this.router.navigate(['dashboardAlumnos']);
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