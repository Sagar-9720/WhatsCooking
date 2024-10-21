import { Recipe } from 'src/app/Models/Recipe';
import { RecipeServiceService } from './../../Services/recipe-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-view-all-recipe',
  templateUrl: './view-all-recipe.component.html',
  styleUrls: ['./view-all-recipe.component.css'],
})
export class ViewAllRecipeComponent implements OnInit {
  role: string | null = null;
  recipeList: Recipe[] = [];
  dialogbox = false;
  selectedRecipe: Recipe = new Recipe();
  user: User = new User();

  constructor(
    private recipeService: RecipeServiceService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUserFromSession();
    this.route.queryParams.subscribe((params) =>
      this.handleQueryParams(params)
    );
  }

  loadUserFromSession() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.role = this.user.role ?? null;
    } else {
      this.role = null;
    }
  }

  handleQueryParams(params: any) {
    if (params['endorsed'] === 'true') {
      this.updateList('endorsedByMe');
    } else if (params['endorsed'] === 'false') {
      this.updateList('endorsedRecipe');
    } else if (params['mealType']) {
      this.filterRecipes('meal_type', params['mealType']);
    } else if (params['mealTiming']) {
      this.filterRecipes('meal_timing', params['mealTiming']);
    } else if (params['cuisine']) {
      this.filterRecipes('cuisine', params['cuisine']);
    } else if (params['seasonal']) {
      this.filterRecipes('seasonal', params['seasonal']);
    } else {
      this.updateList();
    }
  }

  filterRecipes(filterKey: string, filterValue: string) {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = this.filterByRole(data);
      this.recipeList = this.recipeList.filter(
        (recipe) =>
          (recipe as any)[filterKey] !== undefined &&
          (recipe as any)[filterKey].toString() === filterValue
      );
    });
  }

  filterByRole(recipes: Recipe[]): Recipe[] {
    if (this.role === 'Customer') {
      return recipes.filter((recipe) => recipe.recipe_status === true);
    }
    return recipes;
  }

  updateList(filter?: string) {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = this.filterByRole(data);

      if (filter === 'endorsedByMe') {
        this.recipeList = this.recipeList.filter(
          (recipe) => recipe.nutrition?.user?.userId === this.user.userId
        );
      } else if (filter === 'endorsedRecipe') {
        this.recipeList = this.recipeList.filter((recipe) => recipe.nutrition);
      }
    });
  }

  enableDisableRecipe(recipe: Recipe) {
    const newStatus = !recipe.recipe_status;
    recipe.recipe_status = newStatus;

    const action = newStatus
      ? this.recipeService.enableRecipe(recipe)
      : this.recipeService.disableRecipe(recipe);

    action.subscribe({
      next: () => {
        const message = newStatus
          ? 'Recipe enabled successfully'
          : 'Recipe disabled successfully';
        this.toastr.success(message);
        this.updateList();
      },
      error: (error) => {
        const errorMsg = newStatus
          ? 'Error enabling recipe'
          : 'Error disabling recipe';
        this.toastr.error(errorMsg);
        recipe.recipe_status = !newStatus; // revert change on error
        console.error(errorMsg, error);
      },
    });
  }

  modifyRecipe(recipe: Recipe) {
    if (recipe.recipe_id) {
      console.log('Modifying recipe:', recipe);
      this.router.navigate(['/modifyrecipe'], { state: { recipe: recipe } });
    } else {
      console.error('Recipe ID is undefined');
    }
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe).subscribe({
      next: () => {
        this.toastr.success('Recipe deleted successfully');
        this.selectedRecipe = new Recipe();
        this.dialogbox = false;
        this.updateList();
      },
      error: (error) => {
        this.toastr.error('Error deleting recipe');
        this.dialogbox = false;
        console.error('Error deleting recipe:', error);
        this.updateList();
      },
    });
  }

  viewRecipe(recipe: Recipe) {
    if (recipe.recipe_id) {
      console.log('Selected recipe:', recipe);
      this.recipeService.getRecipe(recipe.recipe_id).subscribe({
        next: (data) => {
          this.router.navigate(['/viewrecipe'], { state: { recipe: data } });
        },
        error: (error) => {
          console.error('Error fetching recipe:', error);
        },
      });
    } else {
      console.error('Recipe ID is undefined');
    }
  }

  dialogBox(recipe: Recipe) {
    this.dialogbox = true;
    this.selectedRecipe = recipe;
  }

  endorseRecipe(recipe: Recipe) {
    this.router.navigate(['/viewrecipe'], {
      state: { recipe: recipe },
      queryParams: { endorse: true },
    });
  }
}
