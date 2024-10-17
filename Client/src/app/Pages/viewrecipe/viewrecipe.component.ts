import { Component } from '@angular/core';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';

@Component({
  selector: 'app-viewrecipe',
  templateUrl: './viewrecipe.component.html',
  styleUrls: ['./viewrecipe.component.css'],
})
export class ViewrecipeComponent {
  recipeName: any;
  recipe: any = {
    recipe_name: 'Potato',
    recipe_steps: 'rtjlsdgnlrtwliejlnrglsrlihylkfklg',
    ingredients: [
      { id: 1, name: 'oil' },
      { id: 2, name: 'salt' },
      { id: 2, name: 'redchilli' },
    ],
  };
  comments: string = 'Good';
  constructor(private recipeService: RecipeServiceService) {}

  // viewRecipe(): any {
  //   this.recipeService
  //     .viewRecipe(this.recipe.recipe_name)
  //     .subscribe((r) => (this.recipeName = r));
  // }
}
