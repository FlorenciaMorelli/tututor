import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  signupObj: SignUp;
  roles: string[] = ["Alumno", "Profesor"];

  constructor(private router: Router, private authService: AuthService) {
    this.signupObj = new SignUp();
  }

  onSignup() {
    debugger;
    this.authService.signup(this.signupObj)
    .subscribe(() => 
      {console.log('User has been signed up!');
        alert('You have successfully created an account!\nNow you can log in with your credentials.\nRedirecting...');
        this.router.navigate(['']);
      })
  }
}

export class SignUp {
  newMail: string;
  newPassword: string;
  newConfirmPassword: string;
  newRole: string;

  constructor() {
    this.newMail = '';
    this.newPassword = '';
    this.newConfirmPassword = '';
    this.newRole = '';
  }
}
