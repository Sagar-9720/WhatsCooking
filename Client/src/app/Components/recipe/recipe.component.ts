import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  // Input property to receive recipe data from parent
  @Input() recipe: any;
  isLiked: boolean = false;

  toggleLike() {
    this.isLiked = !this.isLiked;
  }
}
