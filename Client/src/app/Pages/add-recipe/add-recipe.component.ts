import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Ingredient } from '../../Models/Ingredients';
import {
  Recipe,
  MealTiming,
  MealType,
  Seasonal,
  Cuisine,
} from '../../Models/Recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  mealTimings = Object.keys(MealTiming).filter((key) => isNaN(Number(key)));
  mealTypes = Object.keys(MealType).filter((key) => isNaN(Number(key)));
  seasons = Object.keys(Seasonal).filter((key) => isNaN(Number(key)));
  cuisines = Object.keys(Cuisine).filter((key) => isNaN(Number(key)));

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipe_name: ['', Validators.required],
      ingredients: this.fb.array([this.createIngredient()]),
      recipe_steps: ['', Validators.required],
      meal_timing: ['', Validators.required],
      meal_type: ['', Validators.required],
      seasonal: ['', Validators.required],
      cuisine: ['', Validators.required],
      isEndorsed: [false],
      recipeImage: [null, Validators.required],
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const formValues = this.recipeForm.value;
      const recipe = new Recipe(
        undefined,
        formValues.recipe_name,
        formValues.recipe_steps,
        formValues.meal_timing,
        formValues.meal_type,
        formValues.seasonal,
        formValues.cuisine,
        formValues.recipeRating,
        formValues.isEndorsed,
        formValues.nutritionist,
        formValues.nutrition,
        formValues.ingredients
      );
      console.log(recipe);
    } else {
      console.log('Form is invalid');
    }
  }
}
