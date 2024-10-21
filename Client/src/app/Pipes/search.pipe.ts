import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../Models/Recipe';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(recipes: Recipe[], searchText: string): Recipe[] {
    if (!recipes || !searchText) {
      return recipes;
    }
    const lowerCaseSearchText = searchText.toLowerCase();
    return recipes.filter((recipe) =>
      recipe.recipe_name!.toLowerCase().includes(lowerCaseSearchText)
    );
  }
}
