import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../Models/Comments';
import { environment } from 'src/Environment/environment';
@Injectable({
  providedIn: 'root',
})
export class CommentserviceService {
  private apiUrl = environment.apiBaseUrl + 'comment';

  constructor(private http: HttpClient) {}

  commentRecipe(comments: Comments): Observable<any> {
    return this.http.post<any>(this.apiUrl, comments, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  uncommentRecipe(comments: Comments): Observable<any> {
    return this.http.delete<any>(this.apiUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: comments,
    });
  }

  getComments(recipeId?: number, userId?: number): Observable<any> {
    let params: any = {};
    if (recipeId !== undefined) {
      params.recipeId = recipeId;
    }
    if (userId !== undefined) {
      params.userId = userId;
    }
    return this.http.get<any>(this.apiUrl, { params });
  }
}
