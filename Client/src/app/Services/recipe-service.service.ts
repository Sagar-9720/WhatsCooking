import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../Models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  URL: string = 'http://localhost:9097/recipe';
  constructor(private httpModule: HttpClient) {}

  addRecipe(recipe: Recipe) {
    return this.httpModule.post(this.URL, recipe);
  }

  getAllRecipes(): Observable<any> {
    return this.httpModule.get<any>(this.URL + '/all');
  }
}
