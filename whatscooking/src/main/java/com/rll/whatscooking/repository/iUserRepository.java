package com.rll.whatscooking.repository;

import java.util.List;

import com.rll.whatscooking.View.UserView;
import com.rll.whatscooking.domain.User;

public interface iUserRepository {

    User addUser(User user);

    User deleteUser(User user);

    UserView updateUser(User user);

    UserView loginUser(User user);

    UserView changePassword(User user);

    UserView getUserByUsername(String username);

    List<UserView> getAllUsers();

    UserView getUserByEmail(String email);


}
