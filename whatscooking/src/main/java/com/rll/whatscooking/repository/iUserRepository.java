package com.rll.whatscooking.repository;

import java.util.List;

import com.rll.whatscooking.View.UserView;
import com.rll.whatscooking.domain.User;

public interface iUserRepository {

    User addUser(User user);

    User deleteUser(User user);

    User updateUser(User user);

    UserView loginUser(User user);

    UserView changePassword(User user);

    List<UserView> getAllUsers();
}
