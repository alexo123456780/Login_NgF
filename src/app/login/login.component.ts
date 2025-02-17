import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginSuccess = false; 
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log("login exitoso", response);
          this.successMessage = 'Inicio de sesión exitoso.';
          this.router.navigate(['/dashboard']); // Redirigir a la página de inicio
        },
        error => {
          this.errorMessage = 'Usuario no encontrado. Por favor verifica tus credenciales.';
          this.successMessage = null; // Limpiar mensaje de éxito
        }
      );
    }
  }
}