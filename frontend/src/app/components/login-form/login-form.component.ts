import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    });
  }

  onSubmit() {
    console.log("Se enviaron los datos:");
    console.log(this.loginForm.value); 
    // TODO: Implementar la autenticación del usuario en el servidor y manejar errores adecuadamente
    
    // Llamada al servicio de autenticación
    this.authService.login(this.loginForm.value).subscribe((respuesta) =>{
      if (respuesta != null){
        localStorage.setItem('token', respuesta['id']);
        alert("Usuario logueado correctamente");
      } else {
        alert("Error en el inicio de sesión");
      }
      
    }, error=>console.error(<any>error));
  }
}
