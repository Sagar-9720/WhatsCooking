package com.rll.whatscooking.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recipe_id;

    private String recipe_name;
    private String recipe_steps;
    private boolean recipe_status;

    // Categories
    @Enumerated(EnumType.STRING)
    private MealTiming meal_timing;
    @Enumerated(EnumType.STRING)
    private MealType meal_type;
    @Enumerated(EnumType.STRING)
    private Seasonal seasonal;
    @Enumerated(EnumType.STRING)
    private Cuisine cuisine;

    private boolean isEndorsed = false;

    // Nutritionist: May be null
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nutritionist_id", nullable = true)
    private User user; // Nullable nutritionist (User)

    // Nutrition: May be null
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "nutrition_id", nullable = true)
    private Nutrition nutrition; // Nullable Nutrition
    
    // Ingredients: Many to many relation with ingredients
    @ManyToMany(cascade = {  CascadeType.MERGE }, fetch = FetchType.LAZY)
    @JoinTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private List<Ingredients> ingredients = new ArrayList<>();

    // Users who liked the recipe: Initialized as an empty list
    @ManyToMany
    @JoinTable(name = "recipe_likes", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> likedUser = new ArrayList<>(); // Ensure the list is empty by default

    public Recipe() {
        // Default constructor required by JPA
    }

    public Recipe(int recipeId) {
        this.recipe_id = recipeId;
    }
}