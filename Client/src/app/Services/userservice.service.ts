import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  private apiUrl = 'http://localhost:9097/users';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/addUser`, user, { headers });
  }

  loginUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<any>(`${this.apiUrl}/loginUser`, user, { headers })
      .pipe(
        tap((response) => {
          if (response) {
            console.log('User logged in:', response);
            sessionStorage.setItem('user', JSON.stringify(response));
          }
        })
      );
  }

  updateProfile(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/updateUser`, user, { headers });
  }

  changePassword(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/changepassword`, user, {
      headers,
    });
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
    return this.http.get<any>(`${this.apiUrl}/usernames`, { headers });
  }
}
