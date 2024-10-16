export class Ingredient {
  ingredient_id?: number;
  name?: string;

  constructor(ingredient_id?: number, name?: string) {
    this.ingredient_id = ingredient_id;
    this.name = name;
  }
}
