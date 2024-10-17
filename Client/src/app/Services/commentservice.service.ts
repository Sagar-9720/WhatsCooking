import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../Models/Comments';

@Injectable({
  providedIn: 'root',
})
export class CommentserviceService {
  private baseUrl = 'http://localhost:9097/comment';

  constructor(private http: HttpClient) {}

  commentRecipe(comments: Comments): Observable<any> {
    return this.http.post<any>(this.baseUrl, comments, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  uncommentRecipe(comments: Comments): Observable<any> {
    return this.http.delete<any>(this.baseUrl, {
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
    return this.http.get<any>(this.baseUrl, { params });
  }
}
