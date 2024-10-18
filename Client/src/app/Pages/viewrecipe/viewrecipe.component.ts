import { Component } from '@angular/core';
import { Recipe } from 'src/app/Models/Recipe';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';

@Component({
  selector: 'app-viewrecipe',
  templateUrl: './viewrecipe.component.html',
  styleUrls: ['./viewrecipe.component.css'],
})
export class ViewrecipeComponent {
  recipeName: any;
  recipe: any = {
    recipe_name: 'Potato Fry',
    recipe_steps:
      'Indulge in the delight of Crispy Potato Fries, a beloved classic that transforms simple potatoes into golden, crunchy perfection. Start with fresh Russet or Yukon Gold potatoes, which are ideal for achieving that perfect texture. After cutting them into uniform sticks, soak them in cold water to remove excess starch, ensuring extra crispiness. Once dried, fry the potatoes in hot oil until they turn a beautiful golden brown, then drain them and season with salt and your choice of spices for added flavor. Best served immediately, these fries make a perfect side dish or snack, paired wonderfully with your favorite dipping sauces like ketchup or aioli. Enjoy the satisfying crunch and the comforting taste of homemade fries that are sure to please any crowd!',
    ingredients: [
      { id: 1, name: 'medium-sized potatoes' },
      { id: 2, name: 'oil' },
      { id: 3, name: 'mustard seeds' },
      { id: 4, name: 'cumin seeds' },
      { id: 5, name: 'turmeric powder' },
      { id: 6, name: ' red chili powder' },
      { id: 7, name: 'salt' },
      { id: 8, name: 'fresh coriander leaves' },
      { id: 9, name: 'lemon juice' },
    ],
  };

  message: string = '';
  comments = [
    { author: 'Raji', text: 'This is the first comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Jagadish', text: 'This is the third comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
    { author: 'Nihaa', text: 'This is the second comment!' },
  ];
  displayedComments: any[] = [];

  constructor(private recipeService: RecipeServiceService) {}

  // viewRecipe(): any {
  //   this.recipeService
  //     .viewRecipe(this.recipe.recipe_name)
  //     .subscribe((r) => (this.recipeName = r));
  // }
  showMore = false;
  toggleShowMore() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.displayedComments = this.comments;
      // Show all comments
    } else {
      this.displayedComments = this.comments.slice(0, 2);
      // Show only the first two comments
    }
  }
  hasMoreComments() {
    return this.comments.length > 2;
  }
  isLiked: boolean = false;
  toggleLike() {
    this.isLiked = !this.isLiked;
    this.message = this.isLiked
      ? 'You liked this recipe!'
      : 'You unliked this recipe.';
  }
  rating: any = 0;
  rateRecipe(star: number) {
    this.rating = star; // Set the rating based on the star clicked
  }
}
