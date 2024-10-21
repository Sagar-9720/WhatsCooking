package com.rll.whatscooking;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import com.rll.whatscooking.domain.Comments;
import com.rll.whatscooking.domain.Ingredients;
import com.rll.whatscooking.domain.Recipe;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.repository.IngredientRepository;
import com.rll.whatscooking.repository.RecipeRepository;
import com.rll.whatscooking.repository.UserRepository;
import com.rll.whatscooking.services.CommentService;
import com.rll.whatscooking.services.RecipeService;

public class RecipeServiceTest {

    @Mock
    private RecipeRepository recipeRepository;

    @Mock
    private IngredientRepository ingredientRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CommentService commentService;

    @InjectMocks
    private RecipeService recipeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddRecipe() {
        // Setup
        Recipe recipe = new Recipe();
        List<Ingredients> ingredients = new ArrayList<>();
        Ingredients ingredient = new Ingredients();
        ingredient.setIngredientId(0); // New ingredient
        ingredients.add(ingredient);
        recipe.setIngredients(ingredients);

        // Mock behavior for new ingredient
        when(ingredientRepository.save(any(Ingredients.class))).thenReturn(ingredient);
        when(recipeRepository.save(any(Recipe.class))).thenReturn(recipe);

        // Act
        Recipe savedRecipe = recipeService.addRecipe(recipe);

        // Assert
        assertNotNull(savedRecipe);
        verify(ingredientRepository, times(1)).save(any(Ingredients.class));
        verify(recipeRepository, times(1)).save(recipe);
    }

    @Test
    public void testUpdateRecipe() {
        // Setup
        Recipe existingRecipe = new Recipe();
        existingRecipe.setRecipe_id(1);
        when(recipeRepository.findById(1)).thenReturn(Optional.of(existingRecipe));
        when(recipeRepository.save(any(Recipe.class))).thenReturn(existingRecipe);

        // Act
        Recipe updatedRecipe = recipeService.updateRecipe(existingRecipe);

        // Assert
        assertNotNull(updatedRecipe);
        assertEquals(existingRecipe.getRecipe_id(), updatedRecipe.getRecipe_id());
        verify(recipeRepository, times(1)).findById(1);
        verify(recipeRepository, times(1)).save(existingRecipe);
    }

    @Test
    public void testDeleteRecipe() {
        // Setup
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(1);
        List<Comments> comments = new ArrayList<>();
        when(recipeRepository.findById(1)).thenReturn(Optional.of(recipe));
        when(commentService.findByRecipeId(1)).thenReturn(comments);

        // Act
        Recipe deletedRecipe = recipeService.deleteRecipe(recipe);

        // Assert
        assertNotNull(deletedRecipe);
        verify(recipeRepository, times(1)).findById(1);
        verify(commentService, times(1)).findByRecipeId(1);
        verify(recipeRepository, times(1)).delete(recipe);
    }

    @Test
    public void testEndorseRecipe() {
        // Setup
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(1);
        recipe.setEndorsed(false);
        when(recipeRepository.findById(1)).thenReturn(Optional.of(recipe));
        when(recipeRepository.save(any(Recipe.class))).thenReturn(recipe);

        // Act
        Recipe endorsedRecipe = recipeService.endorseRecipe(recipe);

        // Assert
        assertTrue(endorsedRecipe.isEndorsed());
        verify(recipeRepository, times(1)).findById(1);
        verify(recipeRepository, times(1)).save(recipe);
    }

    @Test
    public void testLikeRecipe() {
        // Setup
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(1);
        User user = new User();
        user.setUserId(1);
        recipe.setLikedUser(new ArrayList<>());

        when(recipeRepository.findById(1)).thenReturn(Optional.of(recipe));
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(recipeRepository.save(any(Recipe.class))).thenReturn(recipe);

        // Act
        recipe.getLikedUser().add(user);
        Recipe likedRecipe = recipeService.likeRecipe(recipe);

        // Assert
        assertEquals(1, likedRecipe.getLikedUser().size());
        verify(recipeRepository, times(1)).findById(1);
        verify(userRepository, times(1)).findById(1);
        verify(recipeRepository, times(1)).save(recipe);
    }

    @Test
    public void testUnlikeRecipe() {
        // Setup
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(1);
        User user = new User();
        user.setUserId(1);
        recipe.getLikedUser().add(user);

        when(recipeRepository.findById(1)).thenReturn(Optional.of(recipe));
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(recipeRepository.save(any(Recipe.class))).thenReturn(recipe);

        // Act
        recipe.getLikedUser().remove(user);
        Recipe unlikedRecipe = recipeService.unlikeRecipe(recipe);

        // Assert
        assertEquals(0, unlikedRecipe.getLikedUser().size());
        verify(recipeRepository, times(1)).findById(1);
        verify(userRepository, times(1)).findById(1);
        verify(recipeRepository, times(1)).save(recipe);
    }

    @Test
    public void testSearchRecipes() {
        // Setup
        List<Recipe> recipes = new ArrayList<>();
        Recipe recipe1 = new Recipe();
        recipe1.setRecipe_name("Pasta");
        recipes.add(recipe1);

        when(recipeRepository.findByRecipeNameContaining("Pasta")).thenReturn(recipes);

        // Act
        List<com.rll.whatscooking.View.recipeCard> recipeCards = recipeService.searchRecipes("Pasta");

        // Assert
        assertEquals(1, recipeCards.size());
        assertEquals("Pasta", recipeCards.get(0).getRecipe_name());
        verify(recipeRepository, times(1)).findByRecipeNameContaining("Pasta");
    }
}
