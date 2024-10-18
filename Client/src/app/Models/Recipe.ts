import { Nutrition } from './Nutrition';
import { Ingredient } from './Ingredients';
import { User } from './User';

export class Recipe {
  recipe_id?: number;
  recipe_name?: string;
  recipe_steps?: string;
  recipe_status?: boolean;

  meal_timing?: MealTiming;
  meal_type?: MealType;
  seasonal?: Seasonal;
  cuisine?: Cuisine;

  nutrition?: Nutrition;
  ingredients?: Ingredient[];
  recipe_rating?: number;
  likedUser?: User[];
  isEndorsed?: boolean;

  constructor(
    recipe_id?: number,
    recipe_name?: string,
    recipe_steps?: string,
    recipe_status?: boolean,
    meal_timing?: MealTiming,
    meal_type?: MealType,
    seasonal?: Seasonal,
    cuisine?: Cuisine,
    nutrition?: Nutrition,
    ingredients?: Ingredient[],
    recipe_rating?: number,
    likedUser?: User[],
    isEndorsed?: boolean
  ) {
    this.recipe_id = recipe_id;
    this.recipe_name = recipe_name;
    this.recipe_steps = recipe_steps;
    this.recipe_status = recipe_status;
    this.meal_timing = meal_timing;
    this.meal_type = meal_type;
    this.seasonal = seasonal;
    this.cuisine = cuisine;
    this.nutrition = nutrition;
    this.ingredients = ingredients;
    this.recipe_rating = recipe_rating;
    this.likedUser = likedUser;
    this.isEndorsed = isEndorsed;
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
