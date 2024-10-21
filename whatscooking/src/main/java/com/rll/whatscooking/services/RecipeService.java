package com.rll.whatscooking.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rll.whatscooking.View.recipeCard;
import com.rll.whatscooking.domain.Comments;
import com.rll.whatscooking.domain.Ingredients;
import com.rll.whatscooking.domain.Nutrition;
import com.rll.whatscooking.domain.Recipe;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.repository.IngredientRepository;
import com.rll.whatscooking.repository.RecipeRepository;
import com.rll.whatscooking.repository.UserRepository;
import com.rll.whatscooking.repository.iRecipeRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RecipeService implements iRecipeRepository {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentService commentService;

    @Override
    public Recipe addRecipe(Recipe recipe) {
        recipe.setNutrition(null);

        // Initialize endorsed and likedUser
        recipe.setEndorsed(false);
        recipe.setLikedUser(new ArrayList<>());

        // Ensure that ingredients are properly handled
        List<Ingredients> ingredients = recipe.getIngredients();

        if (ingredients != null && !ingredients.isEmpty()) {
            for (int i = 0; i < ingredients.size(); i++) {
                Ingredients ingredient = ingredients.get(i);

                // Fetch or save the ingredient based on its ID
                if (ingredient.getIngredientId() == 0) {
                    // New ingredient, so save it
                    ingredient = ingredientsRepository.save(ingredient);
                } else {
                    // Fetch existing ingredient
                    ingredient = ingredientsRepository.findById(ingredient.getIngredientId())
                            .orElseThrow(() -> new EntityNotFoundException("Ingredient not found"));
                }

                // Update the ingredient in the recipe's list with the managed entity
                ingredients.set(i, ingredient);
            }
        }

        // Finally, save the recipe with the updated ingredients
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
            List<Comments> comments = commentService.findByRecipeId(existingRecipe.getRecipe_id());
            if (comments != null && !comments.isEmpty()) {
                commentService.deleteCommentByRecipeId(existingRecipe.getRecipe_id());
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
        recipeRepository.findAll().stream().forEach(recipe -> {
            Nutrition nutrition = (recipe.getNutrition() != null) ? recipe.getNutrition() : null;
            recipeCardList.add(new recipeCard(
                    recipe.getRecipe_id(),
                    recipe.getRecipe_name(),
                    recipe.getMeal_timing(),
                    recipe.getMeal_type(),
                    recipe.getSeasonal(),
                    recipe.getCuisine(),
                    recipe.getLikedUser().size(),
                    recipe.isRecipe_status(),
                    recipe.isEndorsed(),
                    nutrition
            ));
        });
        return recipeCardList;
    }

    @Override
    public Recipe likeRecipe(Recipe recipe) {
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe must not be null");
        }
        // Check if the recipe exists in the database
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (!optionalRecipe.isPresent()) {
            throw new IllegalArgumentException("Recipe does not exist");
        }
        // Check if the user exists in the database
        User user = recipe.getLikedUser().get(0);
        Optional<User> optionalUser = userRepository.findById(user.getUserId());
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User does not exist");
        }

        user = optionalUser.get();
        // Check if the user already liked the recipe
        Recipe existingRecipe = optionalRecipe.get();
        if (!existingRecipe.getLikedUser().contains(user)) {
            existingRecipe.getLikedUser().add(user);
            return recipeRepository.save(existingRecipe);

        }
        return null;
    }

    @Override
    public Recipe unlikeRecipe(Recipe recipe) {
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe must not be null");
        }
        // Check if the recipe exists in the database
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (!optionalRecipe.isPresent()) {
            throw new IllegalArgumentException("Recipe does not exist");
        }
        // Check if the user exists in the database
        User user = recipe.getLikedUser().get(0);
        Optional<User> optionalUser = userRepository.findById(user.getUserId());
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User does not exist");
        }

        user = optionalUser.get();
        // Check if the user already liked the recipe
        Recipe existingRecipe = optionalRecipe.get();
        if (existingRecipe.getLikedUser().contains(user)) {
            existingRecipe.getLikedUser().remove(user);
            return recipeRepository.save(existingRecipe);

        }
        return null;
    }

    @Override
    public Recipe enabledRecipe(Recipe recipe) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            existingRecipe.setRecipe_status(true);
            return recipeRepository.save(existingRecipe);
        }
        return null;
    }

    @Override
    public Recipe disableRecipe(Recipe recipe) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            existingRecipe.setRecipe_status(false);
            return recipeRepository.save(existingRecipe);

        }
        return null;
    }

    public String uploadImage(String previousFileName, String recipeName) {
        // Locate the image file in the asset/recipe_images directory
        Path imagePath = Paths.get("C:\\Users\\sagar.gupta1\\Desktop\\21-10-24\\WhatsCooking\\Client\\src\\assets\\Recipe_Images\\", previousFileName);
        if (!Files.exists(imagePath)) {
            throw new RuntimeException("Image file not found: " + previousFileName);
        }

        // Define the new file name and path
        Path newImagePath = Paths.get("C:\\Users\\sagar.gupta1\\Desktop\\21-10-24\\WhatsCooking\\Client\\src\\assets\\Recipe_Images\\", recipeName);

        try {
            // Rename the file
            Files.move(imagePath, newImagePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to rename image file", e);
        }

        return newImagePath.toString();
    }
}
