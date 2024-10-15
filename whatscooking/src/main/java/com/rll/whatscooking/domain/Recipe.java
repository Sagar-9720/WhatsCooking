package com.rll.whatscooking.domain;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    // categories
    private MealTiming meal_timing;
    private MealType meal_type;
    private Seasonal seasonal;
    private Cuisine cuisine;

    private int recipe_rating;
    private boolean isEndorsed = false;

    @ManyToOne(fetch   = FetchType.LAZY)
    @JoinColumn(name = "nutrionist_id")
    private Nutritionist nutritionist;

    @OneToOne(fetch   = FetchType.EAGER)
    @JoinColumn(name = "nutririon_id")
    private Nutrition nutrition;

    @ManyToMany(mappedBy   = "recipes", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private List<Ingredients> ingredients;
}
