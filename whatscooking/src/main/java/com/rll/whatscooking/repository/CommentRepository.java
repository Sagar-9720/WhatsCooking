package com.rll.whatscooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rll.whatscooking.domain.Comments;

import jakarta.transaction.Transactional;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Integer> {

    // Find comments by recipe ID
    @Query("SELECT c FROM Comments c WHERE c.recipe.recipe_id = :recipeId")
    List<Comments> findByRecipeId(@Param("recipeId") int recipeId);

    // Get comment by user ID and recipe ID
    @Query("SELECT c FROM Comments c WHERE c.recipe.recipe_id = :recipeId AND c.user.userId = :userId")
    Comments getCommentByUserIdAndRecipeId(@Param("recipeId") int recipeId, @Param("userId") int userId);

    // Delete comment by recipe ID
    @Modifying
    @Transactional
    @Query("DELETE FROM Comments c WHERE c.recipe.recipe_id = :recipeId")
    void deleteCommentByRecipeId(@Param("recipeId") int recipeId);
}
