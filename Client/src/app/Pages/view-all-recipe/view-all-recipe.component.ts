import { Recipe } from 'src/app/Models/Recipe';
import { RecipeServiceService } from './../../Services/recipe-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-recipe',
  templateUrl: './view-all-recipe.component.html',
  styleUrls: ['./view-all-recipe.component.css'],
})
export class ViewAllRecipeComponent implements OnInit {
  role: string | null = null;
  constructor(
    private recipeService: RecipeServiceService,
    private router: Router
  ) {}
  recipeList: Recipe[] = [];
  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.role = parsedUser.role;
    } else {
      this.role = null;
    }
    this.updateList();
  }
  updateList() {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      console.log(this.recipeList);
    });
  }
  enableDisableRecipe(recipe: Recipe) {
    if (recipe.recipe_status) {
      recipe.recipe_status = false;
      this.recipeService.disableRecipe(recipe).subscribe((data) => {
        console.log(data);
      });
    } else {
      recipe.recipe_status = true;
      this.recipeService.enableRecipe(recipe).subscribe((data) => {
        console.log(data);
      });
    }
  }
  modifyRecipe(recipe: Recipe) {
    this.recipeService.updateRecipe(recipe).subscribe((data) => {
      console.log(data);
    });
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      console.log(this.recipeList);
    });
  }
  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe).subscribe((data) => {
      console.log(data);
    });
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      console.log(this.recipeList);
    });
  }
  viewRecipe(recipe: Recipe) {
    if (recipe.recipe_id !== undefined) {
      this.recipeService.getRecipe(recipe.recipe_id).subscribe(
        (data) => {
          this.router.navigate(['/viewrecipe'], {
            state: { recipe: data },
          });
        },
        (error) => {
          console.error('Error fetching recipe:', error);
        }
      );
    } else {
      console.error('Recipe ID is undefined');
    }
  }
}
