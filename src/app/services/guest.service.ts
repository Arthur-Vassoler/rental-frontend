import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  private getToken(): string {
    let rawToken = sessionStorage.getItem('authToken') || '';
    const cleanedToken = rawToken.split('"').join('');
    return cleanedToken;
  }

  getItems(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/guest`, { headers });
  }
}
