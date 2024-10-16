package com.rll.whatscooking.repository;

import java.util.List;

import com.rll.whatscooking.View.recipeCard;
import com.rll.whatscooking.domain.Recipe;
import com.rll.whatscooking.domain.User;

public interface iRecipeRepository {

    Recipe addRecipe(Recipe recipe);

    Recipe updateRecipe(Recipe recipe);

    Recipe deleteRecipe(Recipe recipe);

    Recipe endorseRecipe(Recipe recipe);

    Recipe viewRecipe(Recipe recipe);

    List<recipeCard> viewAllRecipes();

    boolean likeRecipe(Recipe recipe, User user);

    boolean unlikeRecipe(Recipe recipe, User user);

}
