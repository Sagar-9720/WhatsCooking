import { Component, OnInit } from '@angular/core';
import { MealType, Seasonal, Cuisine, MealTiming } from 'src/app/Models/Recipe';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css'],
})
export class NavsComponent implements OnInit {
  MealType = MealType;
  Seasonal = Seasonal;
  Cuisine = Cuisine;
  MealTiming = MealTiming;
  mealTypeValues: string[] = [];
  seasonalValues: string[] = [];
  cuisineValues: string[] = [];
  mealTimingValues: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.mealTypeValues = Object.keys(MealType).filter((key) =>
      isNaN(Number(key))
    );
    this.seasonalValues = Object.keys(Seasonal).filter((key) =>
      isNaN(Number(key))
    );
    this.cuisineValues = Object.keys(Cuisine).filter((key) =>
      isNaN(Number(key))
    );
    this.mealTimingValues = Object.keys(MealTiming).filter((key) =>
      isNaN(Number(key))
    );
  }
  selectedMealType: string = '';
  selectedSeasonal: string = '';
  selectedCuisine: string = '';
  selectedMealTiming: string = '';

  selectMealType(item: string) {
    this.selectedMealType = item;
  }

  selectSeasonal(item: string) {
    this.selectedSeasonal = item;
  }

  selectCuisine(item: string) {
    this.selectedCuisine = item;
  }

  selectMealTiming(item: string) {
    this.selectedMealTiming = item;
  }
}
