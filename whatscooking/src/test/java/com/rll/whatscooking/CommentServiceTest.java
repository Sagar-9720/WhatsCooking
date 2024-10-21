package com.rll.whatscooking;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.rll.whatscooking.domain.Comments;
import com.rll.whatscooking.domain.Recipe;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.repository.CommentRepository;
import com.rll.whatscooking.repository.RecipeRepository;
import com.rll.whatscooking.repository.UserRepository;
import com.rll.whatscooking.services.CommentService;

@SpringBootTest
@Transactional // Ensure all database changes are rolled back after the test
public class CommentServiceTest {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testPersistAndDeleteComment() {
        // Create a new user
        User user = new User();
        user.setUsername("johndoe");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("johndoe@example.com");
        user.setPassword("password");
        user.setRole("USER");
        
        User savedUser = userRepository.save(user);

        // Create a new recipe
        Recipe recipe = new Recipe();
        recipe.setRecipe_name("Spaghetti");
        recipe.setRecipe_steps("Boil water, cook pasta.");
        Recipe savedRecipe = recipeRepository.save(recipe);

        // Create a new comment
        Comments comment = new Comments();
        comment.setComment("Great recipe!");
        comment.setUser(savedUser); // associate with user
        comment.setRecipe(savedRecipe); // associate with recipe

        // Persist the comment
        Comments savedComment = commentService.commentRecipe(comment);
        assertNotNull(savedComment.getCommentId(), "Comment should be saved and have an ID");

        // Fetch the comment by recipeId and userId
        Comments fetchedComment = commentService.getCommentByUserIdAndRecipeId(savedRecipe.getRecipe_id(), savedUser.getUserId());
        assertNotNull(fetchedComment, "The comment should be retrieved based on user and recipe");
        assertEquals("Great recipe!", fetchedComment.getComment(), "The comment content should match");

        // Delete the comment
        Comments deletedComment = commentService.uncommentRecipe(savedComment);
        assertNotNull(deletedComment, "The comment should be deleted");

        // Ensure the comment is deleted
        Comments checkComment = commentRepository.findById(savedComment.getCommentId()).orElse(null);
        assertNull(checkComment, "The comment should no longer exist in the repository");
    }

    @Test
    public void testMultipleCommentsForSameRecipe() {
        // Create another user
        User user2 = new User();
        user2.setUsername("janesmith");
        user2.setFirstName("Jane");
        user2.setLastName("Smith");
        user2.setEmail("janesmith@example.com");
        user2.setPassword("password");
        user2.setRole("USER");
        
        User savedUser2 = userRepository.save(user2);

        // Fetch an existing recipe (assuming one is already saved from previous test)
        Recipe savedRecipe = recipeRepository.findById(1).orElse(null);
        assertNotNull(savedRecipe, "Recipe should exist");

        // Create another comment by a different user for the same recipe
        Comments comment2 = new Comments();
        comment2.setComment("Tried this, turned out great!");
        comment2.setUser(savedUser2);
        comment2.setRecipe(savedRecipe);

        // Persist the new comment
        Comments savedComment2 = commentService.commentRecipe(comment2);
        assertNotNull(savedComment2.getCommentId(), "Comment should be saved and have an ID");

        // Fetch the new comment by userId and recipeId
        Comments fetchedComment2 = commentService.getCommentByUserIdAndRecipeId(savedRecipe.getRecipe_id(), savedUser2.getUserId());
        assertNotNull(fetchedComment2, "The comment should be retrieved based on user and recipe");
        assertEquals("Tried this, turned out great!", fetchedComment2.getComment(), "The second comment content should match");

        // Clean up by deleting the comment
        Comments deletedComment2 = commentService.uncommentRecipe(savedComment2);
        assertNotNull(deletedComment2, "The second comment should be deleted");

        // Ensure the second comment is deleted
        Comments checkComment2 = commentRepository.findById(savedComment2.getCommentId()).orElse(null);
        assertNull(checkComment2, "The second comment should no longer exist in the repository");
    }
}
