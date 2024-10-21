import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/Models/Recipe';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private recipeService: RecipeServiceService,
    private router: Router
  ) {}

  recipies: Recipe[] = [];
  searchText: string = '';
  suggestions: string[] = [];

  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipies = data;
    });
  }

  onSearch(): void {
    // this.search.emit(this.searchText);
    this.router.navigate(['/view-all-recipe'], {
      queryParams: { search: this.searchText },
    });
  }

  onInputChange(): void {
    this.suggestions = this.filterRecipes(this.searchText);
    console.log(this.suggestions);
  }

  filterRecipes(query: string): string[] {
    if (!query) {
      return [];
    }

    return this.recipies
      .map((recipe) => recipe.recipe_name?.trim())
      .filter(
        (name): name is string =>
          !!name && name.toLowerCase().startsWith(query.toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b))
      .slice(0, 5);
  }

  selectSuggestion(suggestion: string): void {
    this.searchText = suggestion;
  }
}
