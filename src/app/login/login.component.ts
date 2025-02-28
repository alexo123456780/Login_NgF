import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginSuccess = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  particles: number[] = Array(20).fill(0).map((_, i) => i);
  




  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initializeParticles();
  }

  initializeParticles() {
    this.particles = Array(20).fill(0).map((_, i) => i);
  }

  getParticleStyle(index: number) {
    const random = () => Math.random();
    return {
      left: `${random() * 100}%`,
      top: `${random() * 100}%`,
      animationDelay: `${random() * 5}s`,
      animationDuration: `${6 + random() * 4}s`
    };
  }



  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log("Login exitoso", response);
          this.successMessage = 'Inicio de sesión exitoso';
          this.errorMessage = null;
          
          // Añadir un pequeño delay para mostrar el mensaje de éxito
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        },
        error => {
          this.errorMessage = 'Usuario no encontrado. Por favor verifica tus credenciales.';
          this.successMessage = null;
        }
      );
    }
  }
}