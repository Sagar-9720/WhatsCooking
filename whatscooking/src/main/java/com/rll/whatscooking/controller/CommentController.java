package com.rll.whatscooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public Comments commentRecipe(@RequestBody Comments comments) {
        return commentService.commentRecipe(comments);
    }

    @DeleteMapping
    public Comments uncommentRecipe(@RequestBody Comments comments) {
        return commentService.uncommentRecipe(comments);
    }

}
