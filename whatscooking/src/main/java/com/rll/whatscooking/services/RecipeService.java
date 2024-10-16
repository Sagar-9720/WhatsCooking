package com.rll.whatscooking.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rll.whatscooking.View.recipeCard;
import com.rll.whatscooking.domain.Ingredients;
import com.rll.whatscooking.domain.Recipe;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.repository.IngredientRepository;
import com.rll.whatscooking.repository.RecipeRepository;
import com.rll.whatscooking.repository.iRecipeRepository;

@Service
public class RecipeService implements iRecipeRepository {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientsRepository;

    @Override
    public Recipe addRecipe(Recipe recipe) {
        recipe.setUser(null);
        recipe.setNutrition(null);
        // Initialize endorsed and likedUser
        recipe.setEndorsed(false);
        recipe.setLikedUser(new ArrayList<>());

        // Ensure that ingredients are properly handled
        List<Ingredients> ingredients = recipe.getIngredients();

        // If ingredients are not empty, ensure they are managed
        if (ingredients != null && !ingredients.isEmpty()) {
            for (Ingredients ingredient : ingredients) {
                // Fetch the ingredient if it exists, or save it if it's a new entity
                if (ingredient.getIngredientId() == 0) {
                    // This is a new ingredient, so persist it
                    // Optionally persist or merge based on your requirements
                    ingredient = ingredientsRepository.save(ingredient);
                } else {
                    // Fetch the existing ingredient to ensure it's managed
                    ingredient = ingredientsRepository.findById(ingredient.getIngredientId()).orElse(null);

                }
            }
        }
        // Finally, save the recipe
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe updateRecipe(Recipe recipe) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            existingRecipe.setRecipe_name(recipe.getRecipe_name());
            existingRecipe.setMeal_timing(recipe.getMeal_timing());
            existingRecipe.setMeal_type(recipe.getMeal_type());
            existingRecipe.setSeasonal(recipe.getSeasonal());
            existingRecipe.setCuisine(recipe.getCuisine());
            existingRecipe.setRecipe_status(recipe.isRecipe_status());
            existingRecipe.setRecipe_steps(recipe.getRecipe_steps());
            existingRecipe.setNutrition(recipe.getNutrition());
            existingRecipe.setUser(recipe.getUser());
            existingRecipe.setLikedUser(recipe.getLikedUser());
            existingRecipe.setEndorsed(recipe.isEndorsed());

            // Ensure that ingredients are properly handled
            List<Ingredients> ingredients = recipe.getIngredients();

            // If ingredients are not empty, ensure they are managed
            if (ingredients != null && !ingredients.isEmpty()) {
                for (Ingredients ingredient : ingredients) {
                    // Fetch the ingredient if it exists, or save it if it's a new entity
                    if (ingredient.getIngredientId() == 0) {
                        // This is a new ingredient, so persist it
                        ingredient = ingredientsRepository.save(ingredient);
                    } else {
                        // Fetch the existing ingredient to ensure it's managed
                        ingredient = ingredientsRepository.findById(ingredient.getIngredientId()).orElse(null);
                    }
                }
            }
            return recipeRepository.save(existingRecipe);
        }
        return null;
    }

    @Override
    public Recipe deleteRecipe(Recipe recipe) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            // Ensure that ingredients are properly handled
            List<Ingredients> ingredients = existingRecipe.getIngredients();

            // If ingredients are not empty, ensure they are managed
            if (ingredients != null && !ingredients.isEmpty()) {
                for (Ingredients ingredient : ingredients) {
                    // Fetch the existing ingredient to ensure it's managed
                    ingredient = ingredientsRepository.findById(ingredient.getIngredientId()).orElse(null);
                }
            }
            recipeRepository.delete(existingRecipe);
            return existingRecipe;
        }
        return null;
    }

    @Override
    public Recipe endorseRecipe(Recipe recipe) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            existingRecipe.setEndorsed(true);
            existingRecipe.setUser(recipe.getUser());
            existingRecipe.setNutrition(recipe.getNutrition());
            return recipeRepository.save(existingRecipe);
        }
        return null;
    }

    @Override
    public Recipe viewRecipe(Recipe recipe) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            // Ensure that ingredients are properly handled
            List<Ingredients> ingredients = existingRecipe.getIngredients();

            // If ingredients are not empty, ensure they are managed
            if (ingredients != null && !ingredients.isEmpty()) {
                for (Ingredients ingredient : ingredients) {
                    // Fetch the existing ingredient to ensure it's managed
                    ingredient = ingredientsRepository.findById(ingredient.getIngredientId()).orElse(null);
                }
            }
            return existingRecipe;
        }
        return null;
    }

    @Override
    public List<recipeCard> viewAllRecipes() {
        List<recipeCard> recipeCardList = new ArrayList<>();
        recipeRepository.findAll().stream().filter(Recipe::isRecipe_status).forEach(recipe -> {
            String userName = recipe.getUser() != null ? recipe.getUser().getFirstName() : "Unknown";
            recipeCardList.add(new recipeCard(
                    recipe.getRecipe_id(),
                    recipe.getRecipe_name(),
                    recipe.getMeal_timing(),
                    recipe.getMeal_type(),
                    recipe.getSeasonal(),
                    recipe.getCuisine(),
                    recipe.getLikedUser().size(),
                    recipe.isEndorsed(),
                    userName));
        });
        return recipeCardList;
    }

    @Override
    public boolean likeRecipe(Recipe recipe, User user) {
        if (!recipe.getLikedUser().contains(user)) {
            recipe.getLikedUser().add(user);
            recipeRepository.save(recipe);
            return true;
        }
        return false;
    }

    @Override
    public boolean unlikeRecipe(Recipe recipe, User user) {
        if (recipe.getLikedUser().contains(user)) {
            recipe.getLikedUser().remove(user);
            recipeRepository.save(recipe);
            return true;
        }
        return false;
    }
}
