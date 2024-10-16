package com.rll.whatscooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rll.whatscooking.domain.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

}
