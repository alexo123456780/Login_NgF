import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  credentials = {username: '', password: ''};

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.credentials).subscribe(
      response => {
        console.log("Registro exitoso", response);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error("Error en el registro", error);
      }
    );
  }
}
