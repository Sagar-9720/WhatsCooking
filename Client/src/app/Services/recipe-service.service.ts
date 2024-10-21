import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../Models/Recipe';
import { environment } from 'src/Environment/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  apiUrl: string = environment.apiBaseUrl + 'recipe';

  constructor(private httpModule: HttpClient) {}

  addRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.post(this.apiUrl, recipe, { responseType: 'text' });
  }

  deleteRecipe(recipe: Recipe): Observable<any> {
    return this.httpModule.delete(this.apiUrl, {
      body: recipe,
      responseType: 'text',
    });
  }

  updateRecipe(recipe: Recipe): Observable<string> {
    return this.httpModule.put(this.apiUrl, recipe, { responseType: 'text' });
  }

  getRecipe(recipeId: number): Observable<Recipe> {
    return this.httpModule
      .get<Recipe>(`${this.apiUrl}/view`, {
        params: { recipeId: recipeId.toString() },
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Recipe>) => {
          const recipe = response.body as Recipe;
          return recipe;
        })
      );
  }

  getAllRecipes(searchText?: string): Observable<any> {
    return this.httpModule
      .get<any>(`${this.apiUrl}/all`, {
        params: searchText ? { search: searchText } : {},
        observe: 'response',
      })
      .pipe(map((response: HttpResponse<any>) => response.body));
  }

  getRecipesByIngredients(ingredientIds: number[]): Observable<Recipe[]> {
    return this.httpModule
      .get<Recipe[]>(`${this.apiUrl}/byIngredients`, {
        params: { ingredientIds: ingredientIds.join(',') },
        observe: 'response',
      })
      .pipe(map((response: any) => response.body || []));
  }

  endorseRecipe(recipe: Recipe): Observable<string> {
    return this.httpModule.put(`${this.apiUrl}/endorse`, recipe, {
      responseType: 'text',
    });
  }

  enableRecipe(recipe: Recipe): Observable<string> {
    return this.httpModule
      .put<string>(`${this.apiUrl}/enable`, recipe, {
        observe: 'response',
        responseType: 'text' as 'json',
      })
      .pipe(map((response: HttpResponse<any>) => response.body));
  }

  disableRecipe(recipe: Recipe): Observable<string> {
    return this.httpModule
      .put<string>(`${this.apiUrl}/disable`, recipe, {
        observe: 'response',
        responseType: 'text' as 'json',
      })
      .pipe(map((response: HttpResponse<any>) => response.body));
  }

  likeRecipe(recipe: Recipe): Observable<string> {
    return this.httpModule
      .put<string>(`${this.apiUrl}/like`, recipe, {
        observe: 'response',
        responseType: 'text' as 'json',
      })
      .pipe(map((response: HttpResponse<any>) => response.body));
  }

  unlikeRecipe(recipe: Recipe): Observable<string> {
    return this.httpModule
      .put<string>(`${this.apiUrl}/unlike`, recipe, {
        observe: 'response',
        responseType: 'text' as 'json',
      })
      .pipe(map((response: HttpResponse<any>) => response.body));
  }

  uploadImage(
    previousFileName: string,
    recipeName: string
  ): Observable<string> {
    return this.httpModule
      .post<string>(
        `${this.apiUrl}/upload?previousFileName=${previousFileName}&recipeName=${recipeName}.jpg`,
        {},
        { observe: 'response', responseType: 'text' as 'json' }
      )
      .pipe(
        map((response: HttpResponse<string>) => {
          console.log('Image uploaded:', response.body);
          return response.body as string;
        })
      );
  }
}
