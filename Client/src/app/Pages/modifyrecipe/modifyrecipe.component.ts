import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  Cuisine,
  MealTiming,
  MealType,
  Recipe,
  Seasonal,
} from 'src/app/Models/Recipe';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';
import { Nutrition } from 'src/app/Models/Nutrition';

function getMealTypeList(): string[] {
  return Object.keys(MealType).filter((key) => isNaN(Number(key)));
}

function getSeasonalList(): string[] {
  return Object.keys(Seasonal).filter((key) => isNaN(Number(key)));
}

function getCuisineList(): string[] {
  return Object.keys(Cuisine).filter((key) => isNaN(Number(key)));
}

function getMealTimingList(): string[] {
  return Object.keys(MealTiming).filter((key) => isNaN(Number(key)));
}

@Component({
  selector: 'app-modifyrecipe',
  templateUrl: './modifyrecipe.component.html',
  styleUrls: ['./modifyrecipe.component.css'],
})
export class ModifyrecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();
  submitted: boolean = false;

  mealTypes: string[] = [];
  seasons: string[] = [];
  cuisines: string[] = [];
  mealTimings: string[] = [];

  userRole: string = '';
  isNutritionist: boolean = false;
  loggedInUser: User = new User();
  nutrition: Nutrition = new Nutrition();

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userRole = this.loggedInUser.role || '';
    console.log(this.userRole);
    this.isNutritionist = this.userRole === 'Nutritionist';

    this.mealTypes = getMealTypeList();
    this.seasons = getSeasonalList();
    this.cuisines = getCuisineList();
    this.mealTimings = getMealTimingList();
  }

  constructor(
    private router: Router,
    private recipeService: RecipeServiceService,
    private toastr: ToastrService
  ) {
    this.fetchRecipe();
  }

  fetchRecipe() {
    const navigation = this.router.getCurrentNavigation();
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

  toggleEdit() {
    this.submitted = !this.submitted;
    if (!this.submitted) {
      this.updateRecipe();
    }
  }

  // Placeholder for your update function
  updateRecipe() {
    console.log('Updating recipe:', this.recipe);

    this.recipeService
      .updateRecipe(this.recipe)
      .subscribe((data: any) => (data = this.recipe));
    console.log('updated data', this.recipe);
    this.router.navigate(['/view-all-recipe']);
  }
}
