package com.rll.whatscooking.repository;

import com.rll.whatscooking.domain.User;

public interface iUserRepository {
    User addUser(User user);
	User deleteUser(int userId);
	User updateUser(User user);
	boolean loginUser(User user);
	boolean changePassword(User user, String password);
}
