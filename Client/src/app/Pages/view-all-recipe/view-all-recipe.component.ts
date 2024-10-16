import { Recipe } from 'src/app/Models/Recipe';
import { RecipeServiceService } from './../../Services/recipe-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-recipe',
  templateUrl: './view-all-recipe.component.html',
  styleUrls: ['./view-all-recipe.component.css'],
})
export class ViewAllRecipeComponent implements OnInit {
  constructor(private recipeService: RecipeServiceService) {}
  recipeList: Recipe[] = [];
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      console.log(this.recipeList);
    });
  }
}
