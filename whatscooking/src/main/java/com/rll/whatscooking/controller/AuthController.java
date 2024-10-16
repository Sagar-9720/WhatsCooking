package com.rll.whatscooking.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.services.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class AuthController {

    @Autowired
    private UserService iUserServiceImpl;

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = iUserServiceImpl.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/loginUser")
    public ResponseEntity<Boolean> loginUser(@RequestBody User user) {
        boolean flag = iUserServiceImpl.loginUser(user);
        return new ResponseEntity<>(flag, HttpStatus.FOUND);

    }

    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User newUser = iUserServiceImpl.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = iUserServiceImpl.getUserByUsername(username);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/changepassword/{password}")
    public ResponseEntity<Boolean> updatePassword(@RequestBody User user, @PathVariable("password") String password) {
        boolean flag = iUserServiceImpl.changePassword(user, password);
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }
}
