package com.rll.whatscooking;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.rll.whatscooking.View.UserView;
import com.rll.whatscooking.domain.Comments;
import com.rll.whatscooking.domain.Ingredients;
import com.rll.whatscooking.domain.Recipe;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.exception.UserNotFoundException;
import com.rll.whatscooking.repository.CommentRepository;
import com.rll.whatscooking.repository.IngredientRepository;
import com.rll.whatscooking.repository.RecipeRepository;
import com.rll.whatscooking.repository.UserRepository;
import com.rll.whatscooking.services.CommentService;
import com.rll.whatscooking.services.IngredientService;
import com.rll.whatscooking.services.RecipeService;
import com.rll.whatscooking.services.UserService;

@SpringBootTest
@Transactional
public class WhatscookingApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private List<User> users;

    @BeforeEach
    void setUpUsers() {
        User admin1 = new User("admin1", "Admin", "One", "admin1@example.com", "adminpass1", "ADMIN");
        User customer1 = new User("customer1", "Customer", "One", "customer1@example.com", "custpass1", "CUSTOMER");
        User user1 = new User("user1", "User", "One", "user1@example.com", "userpass1", "USER");
        User user2 = new User("user2", "User", "Two", "user2@example.com", "userpass2", "USER");

        users = List.of(admin1, customer1, user1, user2);
        userRepository.saveAll(users);
    }

    @Test
    void testAddUser() {
        User newUser = new User("newuser", "New", "User", "newuser@example.com", "newpassword", "USER");
        User savedUser = userService.addUser(newUser);
        assertNotNull(savedUser);
        assertEquals("newuser", savedUser.getUsername());
    }

    @Test
    void testLoginUser_SuccessfulLogin() {
        User loginUser = new User();
        loginUser.setUsername("admin1");
        loginUser.setPassword("adminpass1");

        UserView loggedInUser = userService.loginUser(loginUser);
        assertNotNull(loggedInUser);
        assertEquals("admin1", loggedInUser.getUsername());
    }

    @Test
    void testLoginUser_UnsuccessfulLogin() {
        User loginUser = new User();
        loginUser.setUsername("admin1");
        loginUser.setPassword("wrongpassword");

        try {
            UserView loggedInUser = userService.loginUser(loginUser);
            assertNull(loggedInUser);
        } catch (UserNotFoundException e) {
            // Expected exception for unsuccessful login
            assertTrue(true);
        }
    }

    @Test
    void testUpdateUser() {
        User userToUpdate = users.get(2); // user1
        userToUpdate.setFirstName("UpdatedFirst");
        userToUpdate.setLastName("UpdatedLast");
        UserView updatedUser = userService.updateUser(userToUpdate);

        assertNotNull(updatedUser);
        assertEquals("UpdatedFirst", updatedUser.getFirstName());
    }

    @Test
    void testDeleteUser() {
        User userToDelete = users.get(2); // user1
        User deletedUser = userService.deleteUser(userToDelete);
        assertNotNull(deletedUser);
        Optional<User> foundUser = userRepository.findById(userToDelete.getUserId());
        assertTrue(foundUser.isEmpty());
    }

    @Test
    void testChangePassword() {
        User userToChangePassword = users.get(2); // user1
        userToChangePassword.setPassword("newpassword123");
        UserView updatedUser = userService.changePassword(userToChangePassword);

        assertNotNull(updatedUser);
        Optional<User> foundUser = userRepository.findById(userToChangePassword.getUserId());
        assertTrue(foundUser.isPresent());
        assertEquals("newpassword123", foundUser.get().getPassword());
    }

    @Test
    void testGetUserByUsername() {
        UserView foundUser = userService.getUserByUsername("admin1");
        assertNotNull(foundUser);
        assertEquals("admin1", foundUser.getUsername());
    }

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private IngredientRepository ingredientRepository;

    private Ingredients ingredient1;
    private Ingredients ingredient2;

    @BeforeEach
    void setUpIngredients() {
        ingredient1 = new Ingredients();
        ingredient1.setName("Tomato");

        ingredient2 = new Ingredients();
        ingredient2.setName("Onion");

        ingredientRepository.save(ingredient1);
        ingredientRepository.save(ingredient2);
    }

    @Test
    void testGetAllIngredients() {
        List<Ingredients> ingredientsList = ingredientService.getAllIngredients();
        assertNotNull(ingredientsList);
        assertEquals(2, ingredientsList.size());
    }

    @Test
    void testAddIngredient() {
        Ingredients newIngredient = new Ingredients();
        newIngredient.setName("Garlic");
        Ingredients savedIngredient = ingredientRepository.save(newIngredient);
        assertNotNull(savedIngredient);
        assertEquals("Garlic", savedIngredient.getName());
    }

    @Test
    void testFindIngredientById() {
        Ingredients foundIngredient = ingredientRepository.findById(ingredient1.getIngredientId()).orElse(null);
        assertNotNull(foundIngredient);
        assertEquals("Tomato", foundIngredient.getName());
    }

    @Test
    void testDeleteIngredient() {
        ingredientRepository.delete(ingredient1);
        Ingredients deletedIngredient = ingredientRepository.findById(ingredient1.getIngredientId()).orElse(null);
        assertNull(deletedIngredient);
    }

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private CommentRepository commentRepository;

    private Recipe recipe;
    private User user;
    private Comments comment;

    @BeforeEach
    public void setUpRecipes() {
        user = new User();
        user.setUsername("testuser");
        user.setEmail("testuser@example.com");
        userRepository.save(user);

        recipe = new Recipe();
        recipe.setRecipe_name("Spaghetti");
        recipe.setRecipe_steps("Boil water, cook pasta, serve.");
        recipe.setRecipe_status(true);
        recipeRepository.save(recipe);

        comment = new Comments();
        comment.setComment("Delicious recipe!");
        comment.setUser(user);
        comment.setRecipe(recipe);
        commentRepository.save(comment);
    }

    @Test
    void testAddRecipe() {
        Recipe newRecipe = new Recipe();
        newRecipe.setRecipe_name("Pasta");
        newRecipe.setRecipe_steps("Boil water, add pasta, cook for 10 minutes.");
        newRecipe.setRecipe_status(true);

        Recipe savedRecipe = recipeService.addRecipe(newRecipe);
        assertNotNull(savedRecipe);
        assertEquals("Pasta", savedRecipe.getRecipe_name());
    }

    @Test
    void testUpdateRecipe() {
        recipe.setRecipe_name("Updated Spaghetti");
        Recipe updatedRecipe = recipeService.updateRecipe(recipe);
        assertNotNull(updatedRecipe);
        assertEquals("Updated Spaghetti", updatedRecipe.getRecipe_name());
    }

    @Test
    void testDeleteRecipe() {
        Recipe savedRecipe = recipeRepository.save(recipe);
        Recipe deletedRecipe = recipeService.deleteRecipe(savedRecipe);
        assertNotNull(deletedRecipe);
        Optional<Recipe> deletedRecipeOpt = recipeRepository.findById(savedRecipe.getRecipe_id());
        assertFalse(deletedRecipeOpt.isPresent());
    }

    @Test
    void testViewRecipe() {
        Recipe newRecipe = new Recipe();
        newRecipe.setRecipe_name("Spaghetti");
        newRecipe.setRecipe_steps("Boil water, cook pasta, serve.");
        newRecipe.setRecipe_status(true);
        Recipe savedRecipe = recipeRepository.save(newRecipe);

        Recipe recipeToView = new Recipe();
        recipeToView.setRecipe_id(savedRecipe.getRecipe_id());

        Recipe viewedRecipe = recipeService.viewRecipe(recipeToView);

        assertNotNull(viewedRecipe);
        assertEquals(savedRecipe.getRecipe_name(), viewedRecipe.getRecipe_name());
        assertEquals(savedRecipe.getRecipe_steps(), viewedRecipe.getRecipe_steps());
    }

    @Test
    void testUnlikeRecipe() {
        User likeUser = new User();
        likeUser.setUsername("likeUser");
        userRepository.save(likeUser);

        recipe.getLikedUser().add(likeUser);
        recipeService.likeRecipe(recipe);

        Recipe unlikedRecipe = recipeService.unlikeRecipe(recipe);
        assertNotNull(unlikedRecipe);
        assertFalse(unlikedRecipe.getLikedUser().contains(likeUser));
    }

    @Test
    void testEndorseRecipe() {
        recipe.setEndorsed(false);
        Recipe endorsedRecipe = recipeService.endorseRecipe(recipe);
        assertNotNull(endorsedRecipe);
        assertTrue(endorsedRecipe.isEndorsed());
    }

    @Test
    void testCommentRecipe() {
        Comments newComment = new Comments();
        newComment.setComment("Excellent dish!");
        newComment.setUser(user);
        newComment.setRecipe(recipe);

        Comments savedComment = commentService.commentRecipe(newComment);
        assertNotNull(savedComment);
        assertEquals("Excellent dish!", savedComment.getComment());
    }

    @Test
    void testUncommentRecipe() {
        Comments savedComment = commentRepository.save(comment);
        Comments deletedComment = commentService.uncommentRecipe(savedComment);
        assertNotNull(deletedComment);
        Optional<Comments> deletedCommentOpt = commentRepository.findById(savedComment.getCommentId());
        assertFalse(deletedCommentOpt.isPresent());
    }

    @Test
    void testGetAllComments() {
        List<Comments> allComments = commentService.getAllComments();
        assertNotNull(allComments);
        assertTrue(allComments.size() > 0);
    }

    @Test
    void testFindByRecipeId() {
        List<Comments> comments = commentService.findByRecipeId(recipe.getRecipe_id());
        assertNotNull(comments);
        assertTrue(comments.size() > 0);
    }

    @Test
    void contextLoads() {
    }
}
