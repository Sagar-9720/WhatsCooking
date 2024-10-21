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
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${assetPath}")
    private String assetPath;

    @Override
    public Recipe addRecipe(Recipe recipe) {
        recipe.setNutrition(null);
        recipe.setEndorsed(false);
        recipe.setLikedUser(new ArrayList<>());

        List<Ingredients> ingredients = recipe.getIngredients();

        if (ingredients != null && !ingredients.isEmpty()) {
            for (int i = 0; i < ingredients.size(); i++) {
                Ingredients ingredient = ingredients.get(i);

                if (ingredient.getName().compareTo("") != 0) {
                    continue;
                } else if (ingredient.getIngredientId() == 0) {
                    ingredient = ingredientsRepository.save(ingredient);
                } else {
                    ingredient = ingredientsRepository.findById(ingredient.getIngredientId())
                            .orElseThrow(() -> new EntityNotFoundException("Ingredient not found"));
                }
                ingredients.set(i, ingredient);
            }
        }

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
            existingRecipe.setRecipe_steps(recipe.getRecipe_steps());
            existingRecipe.getIngredients().clear();

            List<Ingredients> ingredients = recipe.getIngredients();
            if (ingredients != null && !ingredients.isEmpty()) {
                for (Ingredients ingredient : ingredients) {
                    if (ingredient.getName().compareTo("") != 0) {
                        continue;
                    } else if (ingredient.getIngredientId() == 0) {
                        ingredient = ingredientsRepository.save(ingredient);
                    } else {
                        ingredient = ingredientsRepository.findById(ingredient.getIngredientId()).orElse(null);
                    }
                    if (ingredient != null) {
                        existingRecipe.getIngredients().add(ingredient);
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
            List<Ingredients> ingredients = existingRecipe.getIngredients();

            if (ingredients != null && !ingredients.isEmpty()) {
                for (Ingredients ingredient : ingredients) {
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
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (!optionalRecipe.isPresent()) {
            throw new IllegalArgumentException("Recipe does not exist");
        }
        User user = recipe.getLikedUser().get(0);
        Optional<User> optionalUser = userRepository.findById(user.getUserId());
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User does not exist");
        }

        user = optionalUser.get();
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
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipe.getRecipe_id());
        if (!optionalRecipe.isPresent()) {
            throw new IllegalArgumentException("Recipe does not exist");
        }
        User user = recipe.getLikedUser().get(0);
        Optional<User> optionalUser = userRepository.findById(user.getUserId());
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User does not exist");
        }

        user = optionalUser.get();
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
        Path imagePath = Paths.get(
                assetPath,
                previousFileName);
        if (!Files.exists(imagePath)) {
            throw new RuntimeException("Image file not found: " + previousFileName);
        }

        Path newImagePath = Paths.get(
                assetPath, recipeName);

        try {
            Files.move(imagePath, newImagePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to rename image file", e);
        }

        return newImagePath.toString();
    }

    public List<recipeCard> searchRecipes(String search) {
        List<recipeCard> recipeCardList = new ArrayList<>();
        recipeRepository.findByRecipeNameContaining(search).stream().forEach(recipe -> {
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
}
