package com.rll.whatscooking.repository;

import java.util.List;

import com.rll.whatscooking.View.recipeCard;
import com.rll.whatscooking.domain.Recipe;

public interface iRecipeRepository {

    Recipe addRecipe(Recipe recipe);

    Recipe updateRecipe(Recipe recipe);

    Recipe deleteRecipe(Recipe recipe);

    Recipe endorseRecipe(Recipe recipe);

    Recipe viewRecipe(Recipe recipe);

    List<recipeCard> viewAllRecipes();

    Recipe likeRecipe(Recipe recipe);

    Recipe unlikeRecipe(Recipe recipe);

    Recipe enabledRecipe(Recipe recipe);

    Recipe disableRecipe(Recipe recipe);

    String uploadImage(String previousFileName, String newFileName);

    List<recipeCard> searchRecipes(String search);
}
