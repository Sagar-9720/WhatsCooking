package com.rll.whatscooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rll.whatscooking.View.recipeCard;
import com.rll.whatscooking.domain.Recipe;
import com.rll.whatscooking.services.RecipeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping
    public ResponseEntity<String> addRecipe(@RequestBody Recipe recipe) {
        System.out.println("this is the recipe: " + recipe);
        Recipe addedRecipe = recipeService.addRecipe(recipe);
        if (addedRecipe != null) {
            return new ResponseEntity<String>("Recipe added successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<String>("Failed to add recipe", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteRecipe(@RequestBody Recipe recipe) {
        Recipe deletedRecipe = recipeService.deleteRecipe(recipe);
        if (deletedRecipe != null) {
            return new ResponseEntity<>("Recipe deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateRecipe(@RequestBody Recipe recipe) {
        Recipe updatedRecipe = recipeService.updateRecipe(recipe);
        if (updatedRecipe != null) {
            return new ResponseEntity<>("Recipe updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/view")
    public ResponseEntity<Recipe> getRecipe(@RequestParam int recipeId) {
        Recipe recipe = recipeService.viewRecipe(new Recipe(recipeId));
        if (recipe != null) {
            return new ResponseEntity<>(recipe, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<recipeCard>> getRecipes(@RequestParam(required = false) String search) {
        List<recipeCard> recipes;
        if (search != null && !search.isEmpty()) {
            recipes = recipeService.searchRecipes(search);
        } else {
            recipes = recipeService.viewAllRecipes();
        }
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    

    @PutMapping("/endorse")
    public ResponseEntity<String> endorseRecipe(@RequestBody Recipe recipe) {
        Recipe endorsedRecipe = recipeService.endorseRecipe(recipe);
        if (endorsedRecipe != null) {
            return new ResponseEntity<>("Recipe endorsed successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/enable")
    public ResponseEntity<String> enableRecipe(@RequestBody Recipe recipe) {
        Recipe enabledRecipe = recipeService.enabledRecipe(recipe);
        if (enabledRecipe != null) {
            return new ResponseEntity<>("Recipe enabled successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/disable")
    public ResponseEntity<String> disableRecipe(@RequestBody Recipe recipe) {
        Recipe enabledRecipe = recipeService.disableRecipe(recipe);
        if (enabledRecipe != null) {
            return new ResponseEntity<>("Recipe disabled successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/like")
    public ResponseEntity<String> likeRecipe(@RequestBody Recipe recipe) {
        System.out.println("Called Like Recipe");
        Recipe liked = recipeService.likeRecipe(recipe);
        if (liked != null) {
            return new ResponseEntity<>("Recipe liked successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Recipe already liked", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/unlike")
    public ResponseEntity<String> unlikeRecipe(@RequestBody Recipe recipe) {
        System.out.println("Called Unlike Recipe");
        Recipe unliked = recipeService.unlikeRecipe(recipe);
        if (unliked != null) {
            return new ResponseEntity<>("Recipe unliked successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Recipe not liked yet", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam String previousFileName, @RequestParam String recipeName) {
        try {
            recipeService.uploadImage(previousFileName, recipeName);
            return new ResponseEntity<>("Image uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
