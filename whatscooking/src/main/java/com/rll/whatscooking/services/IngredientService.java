package com.rll.whatscooking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rll.whatscooking.domain.Ingredients;
import com.rll.whatscooking.repository.IngredientRepository;

@Service
public class IngredientService {
    @Autowired
    IngredientRepository ingredientRepsoitory;

    public List<Ingredients> getAllIngredients() {
        return ingredientRepsoitory.findAll();
    }
}
