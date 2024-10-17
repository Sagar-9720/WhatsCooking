import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  Recipe,
  MealTiming,
  MealType,
  Seasonal,
  Cuisine,
} from '../../Models/Recipe';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { ToastService } from 'angular-toastify';

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
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  recipe: Recipe | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeServiceService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipe_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      ingredients: this.fb.array([this.createIngredient()]),
      recipe_steps: ['', [Validators.required, Validators.minLength(10)]],
      meal_timing: [''], // Removed Validators.required
      meal_type: [''], // Removed Validators.required
      seasonal: [''], // Removed Validators.required
      cuisine: [''], // Removed Validators.required
      recipe_rating: [null],
      isEndorsed: [false],
      nutritionist: [null],
      nutrition: [null],
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
        formValues.recipe_rating,
        formValues.isEndorsed,
        formValues.nutritionist,
        formValues.nutrition,
        formValues.ingredients
      );
      this.recipeService.addRecipe(recipe).subscribe((data) => {
        this.recipe = data;
      });
      if (this.recipe) {
        this.toastService.success('Recipe Added Successfully');
        
      } else {
        this.toastService.error('Failed to add recipe');
      }
    } else {
      this.recipeForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      Object.keys(this.recipeForm.controls).forEach((key) => {
        const controlErrors = this.recipeForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Validation errors for ${key}:`, controlErrors);
        }
      });
      console.log('Form is invalid');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
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
      alert('Failed to Uplaod the Image');
    }
  }
}
