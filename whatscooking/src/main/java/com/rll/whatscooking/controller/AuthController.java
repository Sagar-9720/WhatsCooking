package com.rll.whatscooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rll.whatscooking.View.UserView;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.services.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        if (newUser != null) {
            return new ResponseEntity<>("Successfully registered", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Error Registering the User", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/loginUser")
    public ResponseEntity<UserView> loginUser(@RequestBody User user) {
        UserView userView = userService.loginUser(user);
        if (userView != null) {
            return new ResponseEntity<>(userView, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        User updatedUser = userService.updateUser(user);
        if (updatedUser != null) {
            return new ResponseEntity<>("Successfully Updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error Updating the User", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/username")
    public ResponseEntity<UserView> getUserByUsername(@RequestParam String username) {
        UserView user = userService.getUserByUsername(username);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/changepassword")
    public ResponseEntity<UserView> updatePassword(@RequestBody User user) {
        UserView userView = userService.changePassword(user);
        if (userView != null) {
            return new ResponseEntity<>(userView, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<UserView>> getAllUsers() {
        List<UserView> userViews = userService.getAllUsers();
        return new ResponseEntity<>(userViews, HttpStatus.OK);
    }
}
