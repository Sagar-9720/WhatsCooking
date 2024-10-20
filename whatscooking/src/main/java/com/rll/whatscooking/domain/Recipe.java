package com.rll.whatscooking.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int recipe_id;
    private String recipe_name;
    @Column(columnDefinition = "TEXT")
    private String recipe_steps;
    private boolean recipe_status;
    private boolean isEndorsed = false;
    // Categories
    @Enumerated(EnumType.STRING)
    private MealTiming meal_timing;
    @Enumerated(EnumType.STRING)
    private MealType meal_type;
    @Enumerated(EnumType.STRING)
    private Seasonal seasonal;
    @Enumerated(EnumType.STRING)
    private Cuisine cuisine;

    // Nutrition: May be null
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "nutrition_id", nullable = true)
    private Nutrition nutrition; // Nullable Nutrition

    // Ingredients: Many to many relation with ingredients
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))

    private List<Ingredients> ingredients = new ArrayList<>();

    // Users who liked the recipe: Initialized as an empty list
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "recipe_likes", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> likedUser = new ArrayList<>();

    public Recipe() {
    }

    public Recipe(int recipeId) {
        this.recipe_id = recipeId;
    }
}
