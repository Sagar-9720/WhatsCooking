package com.rll.whatscooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rll.whatscooking.domain.Comments;
import com.rll.whatscooking.services.CommentService;

@CrossOrigin("*")
@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comments> commentRecipe(@RequestBody Comments comments) {
        Comments comment = commentService.commentRecipe(comments);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    // DELETE request to remove a comment from a recipe
    @DeleteMapping
    public ResponseEntity<Comments> uncommentRecipe(@RequestBody Comments comments) {
        Comments deletedComment = commentService.uncommentRecipe(comments);
        return new ResponseEntity<>(deletedComment, HttpStatus.OK);
    }

    // GET request to retrieve comments
    @GetMapping
    public ResponseEntity<?> getComments(
            @RequestParam(required = false) Integer recipeId,
            @RequestParam(required = false) Integer userId) {
        if (recipeId != null && userId != null) {
            Comments comment = commentService.getCommentByUserIdAndRecipeId(recipeId, userId);
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } else if (recipeId != null) {
            List<Comments> commentsList = commentService.findByRecipeId(recipeId);
            return new ResponseEntity<>(commentsList, HttpStatus.OK);
        } else {
            List<Comments> commentsList = commentService.getAllComments();
            return new ResponseEntity<>(commentsList, HttpStatus.OK);
        }
    }
}
