package com.rll.whatscooking.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rll.whatscooking.View.UserView;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.repository.UserRepository;
import com.rll.whatscooking.repository.iUserRepository;

@Service
public class UserService implements iUserRepository {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserView loginUser(User user) {
        Optional<User> existingUserOpt = userRepository.findByUsername(user.getUsername());
        if (existingUserOpt.isPresent() && existingUserOpt.get().getPassword().equals(user.getPassword())) {
            User existingUser = existingUserOpt.get();
            UserView userView = new UserView();
            userView.setUserId(existingUser.getUserId());
            userView.setUsername(existingUser.getUsername());
            userView.setFirstName(existingUser.getFirstName());
            userView.setLastName(existingUser.getLastName());
            userView.setEmail(existingUser.getEmail());
            userView.setRole(existingUser.getRole());
            return userView;
        } else {
            return null;
        }
    }

    @Override
    public User updateUser(User user) {
        Optional<User> existingUserOpt = userRepository.findById(user.getUserId());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole());
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User deleteUser(User user) {
        Optional<User> existingUserOpt = userRepository.findById(user.getUserId());
        if (existingUserOpt.isPresent()) {
            userRepository.delete(existingUserOpt.get());
            return user;
        } else {
            return null;
        }
    }

    @Override
    public UserView changePassword(User user) {
        Optional<User> existingUserOpt = userRepository.findById(user.getUserId());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setPassword(user.getPassword());
            userRepository.save(existingUser);
            UserView userView = new UserView();
            userView.setUserId(existingUser.getUserId());
            userView.setUsername(existingUser.getUsername());
            userView.setFirstName(existingUser.getFirstName());
            userView.setLastName(existingUser.getLastName());
            userView.setEmail(existingUser.getEmail());
            userView.setRole(existingUser.getRole());
            return userView;
        } else {
            return null;
        }
    }

    @Override
    public List<UserView> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserView> userViews = new ArrayList<>();
        for (User user : users) {
            UserView userView = new UserView();
            userView.setUserId(user.getUserId());
            userView.setUsername(user.getUsername());
            userView.setFirstName(user.getFirstName());
            userView.setLastName(user.getLastName());
            userView.setEmail(user.getEmail());
            userView.setRole(user.getRole());
            userViews.add(userView);
        }
        return userViews;
    }
}
