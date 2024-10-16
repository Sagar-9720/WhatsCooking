package com.rll.whatscooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rll.whatscooking.domain.Ingredients;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredients, Integer> {

}
