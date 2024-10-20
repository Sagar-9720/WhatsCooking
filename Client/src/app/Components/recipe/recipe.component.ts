import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/Models/Recipe';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnChanges {
  // Input property to receive recipe data from parent
  @Input() recipe: any;
  user: User | null = null;
  fetchedRecipe: Recipe = new Recipe();
  recipeName: string = '';
  rating: number = 0;

  constructor(
    private recipeService: RecipeServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  // Use ngOnChanges to handle updates to @Input
  ngOnChanges(changes: SimpleChanges) {
    if (changes['recipe'] && this.recipe) {
      // Call fetchRecipe when recipe input changes
      this.recipeName = this.recipe.recipe_name.split(' ').join('');
      this.fetchRecipe();
    }
  }

  async fetchRecipe() {
    if (!this.recipe || !this.recipe.recipe_id) {
      // Avoid fetching if recipe or recipe_id is not available
      return;
    }

    try {
      const data = await this.recipeService
        .getRecipe(this.recipe.recipe_id)
        .toPromise();
      if (data) {
        this.fetchedRecipe = data;

        this.rating = Math.min(
          5,
          Math.floor((this.fetchedRecipe.likedUser?.length ?? 0) / 2)
        );
      }
    } catch (error) {
      this.toastr.error('Error fetching recipe');
    }
  }
}
