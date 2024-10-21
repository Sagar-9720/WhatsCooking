import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  searchText: string = '';
  pageSize: number = 0;

  setPageSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      this.pageSize = 1;
    } else if (screenWidth < 900) {
      this.pageSize = 2;
    } else {
      this.pageSize = 3;
    }
    if (this.recipeList.length > 0) {
      this.paginateRecipes();
    }
  }

  constructor(
    private recipeService: RecipeServiceService,
    private router: Router
  ) {
    this.setPageSize();
    window.addEventListener('resize', this.setPageSize.bind(this));
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      let user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (user.role === 'Customer') {
        this.recipeList = this.recipeList.filter(
          (recipe) => recipe.recipe_status === true
        );
      }
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

  viewRecipe(recipe: Recipe) {
    if (recipe.recipe_id !== undefined) {
      console.log('selected recipe:', recipe);
      this.recipeService.getRecipe(recipe.recipe_id).subscribe({
        next: (data) => {
          console.log('Fetched recipe:', data);
          this.router.navigate(['/viewrecipe'], {
            state: { recipe: data },
          });
        },
        error: (error) => {
          console.error('Error fetching recipe:', error);
        },
      });
    } else {
      console.error('Recipe ID is undefined');
    }
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.paginateRecipes();
  }
}
