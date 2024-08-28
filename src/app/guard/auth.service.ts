import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { User } from './model/user.model';
import moment from 'moment';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl || ''
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/signing`, { email, password }).pipe(
      tap(authResult => this.setSession(authResult)),
      shareReplay(),
      catchError(error => {
        if (error.status != 403) 
          return throwError(() => Error('Desculpe, algo deu errado em nosso sistema. Estamos trabalhando para resolver o problema o mais rápido possível.'))

        return throwError(() => new Error('Falha no login. Por favor, verifique suas credenciais.'));
      })
    );
  }

  private setSession(authResult: any): void {
    const payload = this.decodeJWT(authResult.token);
    sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
    sessionStorage.setItem("customer", JSON.stringify(authResult.customerName));
    sessionStorage.setItem("email", JSON.stringify(authResult.email));
    sessionStorage.setItem("user", JSON.stringify(authResult.user));

    this.router.navigate(['']);
  }

  logout(): void {
    sessionStorage.removeItem("loggedInUser");
  }

  public isLoggedIn(): boolean {
    return moment().isBefore('24h');
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private decodeJWT(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
