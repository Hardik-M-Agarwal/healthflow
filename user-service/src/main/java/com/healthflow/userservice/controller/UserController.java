package com.healthflow.userservice.controller;

import com.healthflow.userservice.entity.User;
import com.healthflow.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/{id}/profile")
public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
    return getUser(id);
}

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        // Security check - user can only access their own data
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        
        Optional<User> user = userService.getUserById(id);
        
        // Check if the requested user is the same as logged-in user
        if (user.isPresent() && user.get().getEmail().equals(currentUsername)) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // Return only the current user's data, not all users
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        
        Optional<User> currentUser = userService.getUserByEmail(currentUsername);
        if (currentUser.isPresent()) {
            // Return only the current user in a list
            return ResponseEntity.ok(List.of(currentUser.get()));
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        
        Optional<User> user = userService.getUserByEmail(currentUsername);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/calorie-goal")
    public ResponseEntity<?> updateCalorieGoal(@PathVariable Long id, @RequestParam Double goal) {
        // Security check - user can only update their own data
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        
        try {
            Optional<User> currentUser = userService.getUserByEmail(currentUsername);
            if (currentUser.isPresent() && currentUser.get().getId().equals(id)) {
                User user = userService.updateCalorieGoal(id, goal);
                return ResponseEntity.ok(user);
            }
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("User Service is running! 🚀");
    }
}