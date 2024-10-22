import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/Environment/environment';
@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  private apiUrl = environment.apiBaseUrl + 'users';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/addUser`, user, {
      responseType: 'text',
      headers,
    });
  }

  loginUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<any>(`${this.apiUrl}/loginUser`, user, { headers })
      .pipe(
        tap((response) => {
          if (response) {
            sessionStorage.setItem('user', JSON.stringify(response));
          }
        })
      );
  }

  updateProfile(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<any>(`${this.apiUrl}/updateUser`, user, {
        headers,
      })
      .pipe(
        tap((response) => {
          if (response) {
            sessionStorage.clear();
            sessionStorage.setItem('user', JSON.stringify(response));
          }
        })
      );
  }

  changePassword(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<any>(`${this.apiUrl}/changepassword`, user, {
        headers,
      })
      .pipe(
        tap((response) => {
          if (response) {
            sessionStorage.clear();
            sessionStorage.setItem('user', JSON.stringify(response));
          }
        })
      );
  }

  getUserDetails(userName: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/username`, {
      headers,
      params: { username: userName },
    });
  }

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }
  getUserDetailsByEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/email`, {
      headers,
      params: { email },
    });
  }
}
