import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/Models/Recipe';

@Component({
  selector: 'app-endorse-recipe',
  templateUrl: './endorse-recipe.component.html',
  styleUrls: ['./endorse-recipe.component.css'],
})
export class EndorseRecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.recipe = navigation.extras.state['recipe'];
    }
  }
}
