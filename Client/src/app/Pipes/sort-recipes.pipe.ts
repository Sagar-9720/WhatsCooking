import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../Models/Recipe';

@Pipe({
  name: 'sortRecipes',
})
export class SortRecipesPipe implements PipeTransform {
  transform(recipes: Recipe[], order: string): Recipe[] {
    if (!recipes) return [];
    if (!order) {
      return recipes;
    }

    return recipes.sort((a, b) => {
      const nameA = a.recipe_name!.toLowerCase();
      const nameB = b.recipe_name!.toLowerCase();

      if (order === 'asc') {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
  }
}
