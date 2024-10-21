package com.rll.whatscooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rll.whatscooking.domain.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    @Query("SELECT r FROM Recipe r JOIN r.ingredients i "
            + "WHERE LOWER(r.recipe_name) LIKE LOWER(CONCAT('%', :searchText, '%')) "
            + "OR LOWER(r.recipe_steps) LIKE LOWER(CONCAT('%', :searchText, '%')) "
            + "OR LOWER(i.name) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Recipe> findByRecipeNameContaining(@Param("searchText") String searchText);

}
