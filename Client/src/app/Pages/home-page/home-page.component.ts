import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/Models/Recipe';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  recipeList: Recipe[] = [];
  paginatedRecipes: Recipe[][] = [];
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(private recipeService: RecipeServiceService) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      if (this.recipeList.length > 0) {
        this.paginateRecipes();
      }
    });
  }

  paginateRecipes(): void {
    this.paginatedRecipes = [];
    for (let i = 0; i < this.recipeList.length; i += this.pageSize) {
      this.paginatedRecipes.push(this.recipeList.slice(i, i + this.pageSize));
    }
    console.log('Paginated Recipes:', this.paginatedRecipes);
    this.currentPage = 0;
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.hasPrevPage) {
      this.currentPage--;
    }
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.paginatedRecipes.length - 1;
  }

  get hasPrevPage(): boolean {
    return this.currentPage > 0;
  }

  onMouseOver(event: MouseEvent): void {
    (event.target as HTMLElement).style.transform = 'scale(1.05)';
  }

  onMouseOut(event: MouseEvent): void {
    (event.target as HTMLElement).style.transform = 'scale(1)';
  }
}
