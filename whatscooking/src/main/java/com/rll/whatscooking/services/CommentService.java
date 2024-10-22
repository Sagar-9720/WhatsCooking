package com.rll.whatscooking.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rll.whatscooking.domain.Comments;
import com.rll.whatscooking.exception.CommentNotFoundException;
import com.rll.whatscooking.repository.CommentRepository;
import com.rll.whatscooking.repository.iCommentRepository;

import jakarta.transaction.Transactional;

@Service
public class CommentService implements iCommentRepository {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comments commentRecipe(Comments comments) {
        return commentRepository.save(comments);
    }

    @Override
    public Comments uncommentRecipe(Comments comments) {
        Optional<Comments> optionalComments = commentRepository.findById(comments.getCommentId());
        if (optionalComments.isPresent()) {
            Comments deletedComments = optionalComments.get();
            commentRepository.delete(deletedComments);
            return deletedComments;
        } else {
            throw new CommentNotFoundException("Comment not found with id: " + comments.getCommentId());
        }
    }

    @Override
    public List<Comments> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comments> findByRecipeId(Integer recipeId) {
        return commentRepository.findByRecipeId(recipeId);
    }

    @Transactional
    public boolean deleteCommentByRecipeId(int recipeId) {
        List<Comments> comments = commentRepository.findByRecipeId(recipeId);
        if (comments.isEmpty()) {
            throw new CommentNotFoundException("No comments found for recipe id: " + recipeId);
        }
        commentRepository.deleteCommentByRecipeId(recipeId);
        return true;
    }
}
