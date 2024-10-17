import { Component } from '@angular/core';
import { MealType, Seasonal, Cuisine, MealTiming } from 'src/app/Models/Recipe';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css'],
})
export class NavsComponent {
  MealType = MealType;
  Seasonal = Seasonal;
  Cuisine = Cuisine;
  MealTiming = MealTiming;
  constructor() {}
}
