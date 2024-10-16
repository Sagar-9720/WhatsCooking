import { Injectable } from '@angular/core';

import { User } from '../Models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  private apiUrl = 'http://localhost:9097/users';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.apiUrl}/addUser`, user, { headers });
  }

  loginUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.apiUrl}/loginUser`, user, { headers });
  }

  updateProfile(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.apiUrl}/updateUser`, user, { headers });
  }

  changePassword(user: User, newPassword: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<boolean>(
      `${this.apiUrl}/changepassword/${newPassword}`,
      user,
      { headers }
    );
  }

  getUserDetails(userName: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<User>(`${this.apiUrl}/username/${userName}`, {
      headers,
    });
  }
}
