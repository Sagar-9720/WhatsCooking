package com.rll.whatscooking;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import com.rll.whatscooking.View.UserView;
import com.rll.whatscooking.domain.User;
import com.rll.whatscooking.repository.UserRepository;
import com.rll.whatscooking.services.UserService;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddUser() {
        // Setup
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");

        when(userRepository.save(any(User.class))).thenReturn(user);

        // Act
        User savedUser = userService.addUser(user);

        // Assert
        assertNotNull(savedUser);
        assertEquals("testuser", savedUser.getUsername());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testLoginUser_Success() {
        // Setup
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");

        User existingUser = new User();
        existingUser.setUserId(1);
        existingUser.setUsername("testuser");
        existingUser.setPassword("password");
        existingUser.setFirstName("Test");
        existingUser.setLastName("User");
        existingUser.setEmail("test@example.com");
        existingUser.setRole("USER");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(existingUser));

        // Act
        UserView userView = userService.loginUser(user);

        // Assert
        assertNotNull(userView);
        assertEquals("testuser", userView.getUsername());
        verify(userRepository, times(1)).findByUsername("testuser");
    }

    @Test
    public void testLoginUser_Failure() {
        // Setup
        User user = new User();
        user.setUsername("nonexistent");
        user.setPassword("password");

        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        // Act
        UserView userView = userService.loginUser(user);

        // Assert
        assertNull(userView);
        verify(userRepository, times(1)).findByUsername("nonexistent");
    }

    @Test
    public void testUpdateUser() {
        // Setup
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Updated");
        user.setLastName("Name");
        user.setEmail("updated@example.com");

        User existingUser = new User();
        existingUser.setUserId(1);
        existingUser.setUsername("testuser");
        existingUser.setFirstName("Test");
        existingUser.setLastName("User");
        existingUser.setEmail("test@example.com");

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(existingUser);

        // Act
        UserView updatedUserView = userService.updateUser(user);

        // Assert
        assertNotNull(updatedUserView);
        assertEquals("Updated", updatedUserView.getFirstName());
        assertEquals("updated@example.com", updatedUserView.getEmail());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    public void testDeleteUser() {
        // Setup
        User user = new User();
        user.setUserId(1);

        User existingUser = new User();
        existingUser.setUserId(1);

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));

        // Act
        User deletedUser = userService.deleteUser(user);

        // Assert
        assertNotNull(deletedUser);
        assertEquals(1, deletedUser.getUserId());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).delete(existingUser);
    }

    @Test
    public void testChangePassword() {
        // Setup
        User user = new User();
        user.setUserId(1);
        user.setPassword("newpassword");

        User existingUser = new User();
        existingUser.setUserId(1);
        existingUser.setUsername("testuser");
        existingUser.setPassword("oldpassword");

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(existingUser);

        // Act
        UserView userView = userService.changePassword(user);

        // Assert
        assertNotNull(userView);
        assertEquals("testuser", userView.getUsername());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    public void testGetUserByUsername() {
        // Setup
        User user = new User();
        user.setUserId(1);
        user.setUsername("testuser");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setEmail("test@example.com");
        user.setRole("USER");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        // Act
        UserView userView = userService.getUserByUsername("testuser");

        // Assert
        assertNotNull(userView);
        assertEquals("testuser", userView.getUsername());
        verify(userRepository, times(1)).findByUsername("testuser");
    }

    @Test
    public void testGetAllUsers() {
        // Setup
        List<User> users = new ArrayList<>();
        User user1 = new User();
        user1.setUserId(1);
        user1.setUsername("testuser1");
        users.add(user1);

        User user2 = new User();
        user2.setUserId(2);
        user2.setUsername("testuser2");
        users.add(user2);

        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<UserView> userViews = userService.getAllUsers();

        // Assert
        assertEquals(2, userViews.size());
        assertEquals("testuser1", userViews.get(0).getUsername());
        assertEquals("testuser2", userViews.get(1).getUsername());
        verify(userRepository, times(1)).findAll();
    }
}
