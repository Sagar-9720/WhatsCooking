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

  addRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.post<any>(this.URL, recipe);
  }

  deleteRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.delete<any>(this.URL, { body: recipe });
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.put<any>(this.URL, recipe);
  }

  getRecipe(recipeId: number): Observable<any> {
    return this.httpModule.get<any>(`${this.URL}/view`, {
      params: { recipeId: recipeId.toString() },
    });
  }

  getAllRecipes(): Observable<any> {
    return this.httpModule.get<any>(`${this.URL}/all`);
  }

  getRecipesByIngredients(ingredientIds: number[]): Observable<any> {
    return this.httpModule.get<any>(`${this.URL}/byIngredients`, {
      params: { ingredientIds: ingredientIds.join(',') },
    });
  }

  endorseRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.put<any>(`${this.URL}/endorse`, recipe);
  }

  enableRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.put<any>(`${this.URL}/enable`, recipe);
  }

  disableRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.put<any>(`${this.URL}/disable`, recipe);
  }

  likeRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.put<any>(`${this.URL}/like`, recipe);
  }

  unlikeRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.put<any>(`${this.URL}/unlike`, recipe);
  }
}
