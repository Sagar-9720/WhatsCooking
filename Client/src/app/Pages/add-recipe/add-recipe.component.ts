import { Ingredient } from './../../Models/Ingredients';
import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import {
  Recipe,
  MealType,
  MealTiming,
  Seasonal,
  Cuisine,
} from '../../Models/Recipe';

import { Nutrition } from '../../Models/Nutrition';
import { User } from 'src/app/Models/User';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();
  ingredients: Ingredient[] = [{ ingredient_id: 0, name: '' }];
  userRole: string = '';
  isNutritionist: boolean = false;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  mealTypes: string[] = [];
  seasons: string[] = [];
  cuisines: string[] = [];
  mealTimings: string[] = [];
  loggedInUser: User = new User();
  nutrition: Nutrition = new Nutrition();
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  constructor(
    private recipeService: RecipeServiceService,
    private toast: ToastrService,
    private ingredientService: IngredientserviceService
  ) {}

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
  }

  removeIngredient(index: number) {
    let ingredients: Ingredient[] = [];
    this.ingredients.forEach((ingredient, i) => {
      if (i !== index) {
        ingredients.push(ingredient);
      }
    });
    this.ingredients = ingredients;
  }
  filterIngredients(value: string): void {
    this.filteredIngredients = this.allIngredients.filter((ingredient) =>
      ingredient.name?.toLowerCase().includes(value.toLowerCase())
    );
  }
  optionSelected(ingredientName: string, index: number): void {
    const selectedIngredient = this.allIngredients.find(
      (ingredient) => ingredient.name === ingredientName
    );
    if (selectedIngredient) {
      this.ingredients[index] = selectedIngredient;
    }
  }
  onSubmit(recipeForm: NgForm) {
    if (recipeForm.valid) {
      const nutrition = this.isNutritionist ? this.nutrition : undefined;
      if (nutrition) {
        nutrition.user = this.loggedInUser;
      }
      const likedUsers: User[] = [];
      const newRecipe = new Recipe(
        undefined,
        recipeForm.value.recipe_name,
        recipeForm.value.recipe_steps,
        true,
        recipeForm.value?.meal_timing || null,
        recipeForm.value.meal_type || null,
        recipeForm.value.seasonal || null,
        recipeForm.value.cuisine || null,
        nutrition,
        this.ingredients,
        0,
        likedUsers,
        recipeForm.value.endorsed || false
      );
      console.log('New Recipe:', newRecipe);
      this.recipeService.addRecipe(newRecipe).subscribe({
        next: (response: string) => {
          if (response) {
            this.toast.success('Recipe added successfully');
            let newImageName = newRecipe.recipe_name?.split(' ').join('');
            newRecipe.recipe_name;
            this.recipeService
              .uploadImage(this.selectedFile!.name, newImageName!)
              .subscribe({
                next: (response: string) => {
                  if (response) {
                    this.toast.success('Image uploaded successfully');
                  } else {
                    this.toast.error('Failed to upload image');
                    console.error('Error uploading image: Unknown error');
                  }
                },
                error: (error) => {
                  this.toast.error('Failed to upload image');
                  console.error('Error uploading image:', error);
                },
              });
            recipeForm.reset();
            this.selectedFile = null;
            this.ingredients = [{ ingredient_id: 0, name: '' }];
            this.imageUrl = null;
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
          } else {
            this.toast.error('Failed to add recipe');
            console.error('Error adding recipe: Unknown error');
          }
        },
        error: (error) => {
          this.toast.error('Failed to add recipe');
          console.error('Error adding recipe:', error);
        },
      });
    } else {
      this.toast.error('Invalid form. Please check the form for errors.');
      Object.keys(recipeForm.controls).forEach((key) => {
        const control = recipeForm.controls[key];
        console.log('Invalid control:', control);
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected File:', this.selectedFile);
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if (this.selectedFile) {
      console.log('Uploading:', this.selectedFile.name);
      alert('Image Uploaded Successfully...');
    } else {
      console.error('No file selected!');
      alert('Failed to Upload the Image');
    }
  }
}
