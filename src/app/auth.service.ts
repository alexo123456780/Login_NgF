import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

   private apiUrl = environment.apiUrl;

   constructor(private http: HttpClient){}

   login(credentials: any){
    return this.http.post(`${this.apiUrl}/login`,credentials).pipe(
        catchError(error => {
            console.error('Error en el inicio de sesión:', error);
            return throwError(error);
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

   
}
