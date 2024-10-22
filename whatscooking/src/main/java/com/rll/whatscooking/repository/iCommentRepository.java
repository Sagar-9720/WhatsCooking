package com.rll.whatscooking.repository;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.rll.whatscooking.domain.Comments;

public interface iCommentRepository {

    Comments commentRecipe(Comments comments);

    Comments uncommentRecipe(Comments comments);

    List<Comments> getAllComments();

    List<Comments> findByRecipeId(Integer recipeId);

}
