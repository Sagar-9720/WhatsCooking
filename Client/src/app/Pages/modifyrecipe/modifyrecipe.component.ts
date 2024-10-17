import { Component } from '@angular/core';

@Component({
  selector: 'app-modifyrecipe',
  templateUrl: './modifyrecipe.component.html',
  styleUrls: ['./modifyrecipe.component.css'],
})
export class ModifyrecipeComponent {
  recipe: any = {
    recipe_id: 1,
    recipe_name: 'Spaghetti Carbonara',
    recipe_steps:
      'Boil pasta. Cook bacon. Mix eggs and cheese. Combine all ingredients.',
    meal_timing: 'DINNER',
    meal_type: 'PASTA',
    seasonal: 'WINTER',
    cuisine: 'ITALIAN',
    recipe_rating: 4.5,
    isEndorsed: true,
    nutritionist: {
      id: 1,
      name: 'Jane Doe',
      credentials: 'Registered Dietitian',
    },
    nutrition: { calories: 600, protein: 20, carbs: 75, fat: 25 },
    ingredients: [
      { name: 'Spaghetti' },
      { name: 'Bacon' },
      { name: 'Eggs' },
      { name: 'Parmesan cheese' },
      { name: 'Black pepper' },
    ],
    likedUser: [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ],
  };
  submitted: boolean = false;
  selectedRecipeIndex: number | null | undefined;
  recipes: any;
}
