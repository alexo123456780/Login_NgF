import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'login-app';

  constructor(private router: Router) {
    console.log('Accediendo a la ruta:', this.router.url);
  }
}
