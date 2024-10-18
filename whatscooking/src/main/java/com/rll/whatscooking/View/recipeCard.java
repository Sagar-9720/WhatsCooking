package com.rll.whatscooking.View;

import com.rll.whatscooking.domain.Cuisine;
import com.rll.whatscooking.domain.MealTiming;
import com.rll.whatscooking.domain.MealType;
import com.rll.whatscooking.domain.Seasonal;
import com.rll.whatscooking.domain.Nutrition;
import lombok.Data;

@Data
public class recipeCard {

    private int recipe_id;
    private String recipe_name;
    // categories
    private MealTiming meal_timing;
    private MealType meal_type;
    private Seasonal seasonal;
    private Cuisine cuisine;

    private int recipe_rating;
    private boolean recipe_status;
    private boolean isEndorsed;
    private Nutrition nutrition;

    public recipeCard(int recipeId, String recipeName, MealTiming mealTiming, MealType mealType, Seasonal seasonal, Cuisine cuisine, int recipeRating, boolean recipe_status, boolean endorsed,Nutrition nutrition) {
        this.recipe_id = recipeId;
        this.recipe_name = recipeName;
        this.meal_timing = mealTiming;
        this.meal_type = mealType;
        this.seasonal = seasonal;
        this.cuisine = cuisine;
        this.recipe_rating = recipeRating;
        this.recipe_status = recipe_status;
        this.isEndorsed = endorsed;
        this.nutrition = nutrition;

    }
}
