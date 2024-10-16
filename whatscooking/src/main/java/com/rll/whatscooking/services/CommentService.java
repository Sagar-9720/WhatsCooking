package com.rll.whatscooking.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rll.whatscooking.domain.Comments;
import com.rll.whatscooking.repository.CommentRepository;
import com.rll.whatscooking.repository.iCommentRepository;

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
            commentRepository.delete(optionalComments.get());
            return optionalComments.get();
        }
        return null;
    }
}
