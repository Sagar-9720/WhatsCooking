package com.rll.whatscooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rll.whatscooking.domain.Ingredients;
import com.rll.whatscooking.services.IngredientService;

@CrossOrigin("*")
@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    IngredientService ingredientService;

    @GetMapping
    public ResponseEntity<List<Ingredients>> getAllIngredients() {
        List<Ingredients> ingredients = ingredientService.getAllIngredients();
        if (!ingredients.isEmpty()) {
            return new ResponseEntity<>(ingredients, HttpStatus.OK);
        }
        return new ResponseEntity<>(List.of(), HttpStatus.NOT_FOUND);
    }
}
