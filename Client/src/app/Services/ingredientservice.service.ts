import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class IngredientserviceService {
  private apiUrl = environment.apiBaseUrl + 'ingredients';

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => response.body));
  }
}
