import { User } from './User';

export class Nutrition {
  nutrition_id?: number;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  user?: User;

  constructor(
    nutrition_id?: number,
    calories?: number,
    protein?: number,
    fat?: number,
    carbs?: number,
    user?: User
  ) {
    this.nutrition_id = nutrition_id;
    this.calories = calories;
    this.protein = protein;
    this.fat = fat;
    this.carbs = carbs;
    this.user = user;
  }
}
