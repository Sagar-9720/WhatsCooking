package com.rll.whatscooking.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.repository.UserRepository;
import com.rll.whatscooking.repository.iUserRepository;

@Service
public class UserService implements iUserRepository {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        userRepository.save(user);
        return user;
    }

    @Override
    public User deleteUser(int userId) {
        User user = userRepository.findById(userId).get();
        userRepository.deleteById(userId);
        return user;
    }

    @Override
    public boolean loginUser(User user) {
        Optional<User> existingUserOpt = userRepository.findById(user.getUserId());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            return existingUser.getPassword().equals(user.getPassword()) &&
                    existingUser.getUsername().equals(user.getUsername());
        } else {

            return false;
        }
    }

    @Override
    public User updateUser(User user) {
        userRepository.save(user);
        return user;
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean changePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        userRepository.save(user);
        return true;
    }
}
