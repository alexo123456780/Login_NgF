import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError,tap } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

   private apiUrl = environment.apiUrl;

   constructor(private http: HttpClient, private cookieService: CookieService) {} // Inyectar el servicio de cookies


   login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
        catchError(error => {
            console.error('Error en el inicio de sesión:', error);
            return throwError(error);
        }),
        tap((response: any) => {
            if (response && response.username) {
                this.cookieService.set('username', response.username);
                console.log('Cookie guardada:', this.cookieService.get('username')); // Log para verificar
            }
        })
    );
}


   register(credentials: any) {
    return this.http.post(`${this.apiUrl}/register`, credentials).pipe(
        catchError(error => {
            console.error('Error en el registro:', error);
            return throwError(error);
        })
    );
   }

   logout() {
    this.cookieService.delete('username'); // Eliminar la cookie
    console.log('Sesión cerrada, cookie eliminada.'); // Log para verificar
}

   
}
