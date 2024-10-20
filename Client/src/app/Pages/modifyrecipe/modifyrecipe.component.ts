import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/Models/Recipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modifyrecipe',
  templateUrl: './modifyrecipe.component.html',
  styleUrls: ['./modifyrecipe.component.css'],
})
export class ModifyrecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();

  constructor(
    private route: Router,
    private recipeService: RecipeServiceService,
    private toastr: ToastrService
  ) {
    this.fetchRecipe();
  }

  ngOnInit(): void {}

  fetchRecipe() {
    const navigation = this.route.getCurrentNavigation();
    const state = navigation?.extras.state as { recipe: Recipe };
    const recipe = state.recipe;
    if (recipe) {
      setTimeout(async () => {
        try {
          const data = await this.recipeService
            .getRecipe(recipe.recipe_id ? recipe.recipe_id : 0)
            .toPromise();
          if (data) {
            this.recipe = data;
          }
        } catch (error) {
          this.toastr.error('Error fetching recipe');
        }
      }, 1000);
    }
  }
  editName: boolean = false;
  editSteps: boolean = false;
  editIngredients: boolean[] = [];

  updateRecipe() {
    // this.recipeService.updateRecipe(this.recipe).subscribe(
    //   (data) => {
    //     this.toastr.success('Recipe updated successfully');
    //     this.route.navigate(['/viewrecipe'], {
    //       state: { recipe: this.recipe },
    //     });
    //   },
    //   (error) => {
    //     this.toastr.error('Error updating recipe');
    //   }
    // );
  }
}
