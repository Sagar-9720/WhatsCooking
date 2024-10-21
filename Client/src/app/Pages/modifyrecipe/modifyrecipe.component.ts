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
import { Ingredient } from 'src/app/Models/Ingredients';
import { IngredientserviceService } from 'src/app/Services/ingredientservice.service';

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

  ingredients: Ingredient[] = [];
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userRole = this.loggedInUser.role || '';
    this.isNutritionist = this.userRole === 'nutritionist';
    this.mealTypes = getMealTypeList(); // ['VEGETARIAN', 'NON_VEGETARIAN', ...]
    this.seasons = getSeasonalList(); // ['WINTER', 'SPRING', 'SUMMER', 'FALL']
    this.cuisines = getCuisineList(); // ['ITALIAN', 'CHINESE', 'MEXICAN', ...]
    this.mealTimings = getMealTimingList(); // ['BREAKFAST', 'LUNCH', 'DINNER', ...]
    this.ingredientService.getAllIngredients().subscribe({
      next: (response: Ingredient[]) => {
        if (response) {
          this.allIngredients = response;
          console.log('Ingredients :', this.allIngredients);
        } else {
          console.error('Error fetching ingredients: Unknown error');
        }
      },
      error: (error) => {
        console.error('Error fetching ingredients:', error);
      },
    });

    // Fetch the recipe data
    this.fetchRecipe();
  }

  ngOnChanges(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (response: Ingredient[]) => {
        if (response) {
          this.allIngredients = response;
          console.log('Ingredients :', this.allIngredients);
        } else {
          console.error('Error fetching ingredients: Unknown error');
        }
      },
      error: (error) => {
        console.error('Error fetching ingredients:', error);
      },
    });
  }

  addIngredient() {
    this.ingredients.push({ ingredient_id: 0, name: '' });
    this.recipe.ingredients = this.ingredients;
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.recipe.ingredients = this.ingredients;
  }

  filterIngredients(value: string): void {
    this.filteredIngredients = this.allIngredients.filter((ingredient) =>
      ingredient.name?.toLowerCase().includes(value.toLowerCase())
    );
  }

  optionSelected(ingredientName: string, index: number): void {
    // Find the selected ingredient from the list of all available ingredients
    const selectedIngredient = this.allIngredients.find(
      (ingredient) => ingredient.name === ingredientName
    );

    if (selectedIngredient) {
      // Ensure that 'this.ingredients' is defined as an array and update the correct index
      if (this.ingredients && Array.isArray(this.ingredients)) {
        this.ingredients[index] = selectedIngredient;
      } else {
        console.error('Ingredients list is not properly initialized.');
      }
    } else {
      console.error('Selected ingredient not found.');
    }
  }

  constructor(
    private router: Router,
    private recipeService: RecipeServiceService,
    private toastr: ToastrService,
    private ingredientService: IngredientserviceService
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
            this.ingredients = data.ingredients || [];

            this.submitted = false;
          }
        } catch (error) {
          this.toastr.error('Error fetching recipe');
        }
      }, 1000);
    }
  }

  updateRecipe() {
    console.log('Updating recipe:', this.recipe);
    this.recipeService
      .updateRecipe(this.recipe)
      .subscribe((data: any) => (data = this.recipe));
    console.log('updated data', this.recipe);
    this.router.navigate(['/view-all-recipe']);
  }
}
