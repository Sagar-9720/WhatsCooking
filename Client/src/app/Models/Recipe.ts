import { Nutritionist } from './Nutritionist';
import { Nutrition } from './Nutrition';
import { Ingredient } from './Ingredients';

export class Recipe {
  recipe_id?: number;
  recipe_name?: string;
  recipe_steps?: string;
  meal_timing?: MealTiming;
  meal_type?: MealType;
  seasonal?: Seasonal;
  cuisine?: Cuisine;
  recipe_rating?: number;
  isEndorsed?: boolean;
  nutritionist?: Nutritionist;
  nutrition?: Nutrition;
  ingredients?: Ingredient[];

  constructor(
    recipe_id?: number,
    recipe_name?: string,
    recipe_steps?: string,
    meal_timing?: MealTiming,
    meal_type?: MealType,
    seasonal?: Seasonal,
    cuisine?: Cuisine,
    recipe_rating?: number,
    isEndorsed?: boolean,
    nutritionist?: Nutritionist,
    nutrition?: Nutrition,
    ingredients?: Ingredient[]
  ) {
    this.recipe_id = recipe_id;
    this.recipe_name = recipe_name;
    this.recipe_steps = recipe_steps;
    this.meal_timing = meal_timing;
    this.meal_type = meal_type;
    this.seasonal = seasonal;
    this.cuisine = cuisine;
    this.recipe_rating = recipe_rating;
    this.isEndorsed = isEndorsed;
    this.nutritionist = nutritionist;
    this.nutrition = nutrition;
    this.ingredients = ingredients;
  }
}

export enum MealType {
  VEGETARIAN,
  NON_VEGETARIAN,
  VEGAN,
  PESCATARIAN,
  GLUTEN_FREE,
  DAIRY_FREE,
  KETO,
  PALEO,
}

export enum Seasonal {
  WINTER,
  SPRING,
  SUMMER,
  FALL,
}

export enum Cuisine {
  ITALIAN,
  CHINESE,
  MEXICAN,
  INDIAN,
  FRENCH,
  JAPANESE,
  THAI,
  MEDITERRANEAN,
}

export enum MealTiming {
  BREAKFAST,
  LUNCH,
  DINNER,
  SNACK,
  DRINKS,
  DESSERT,
}
