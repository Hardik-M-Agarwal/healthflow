package com.healthflow.userservice.controller;

import com.healthflow.userservice.entity.User;
import com.healthflow.userservice.service.UserService;
import com.healthflow.userservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("🔐 Login attempt for: " + loginRequest.getUsername());
            
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            System.out.println("✅ Authentication successful for: " + loginRequest.getUsername());

            // Generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails.getUsername());

            // Get user details
            Optional<User> user = userService.getUserByEmail(loginRequest.getUsername());
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found");
            }

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("userId", user.get().getId());
            response.put("firstName", user.get().getFirstName());
            response.put("lastName", user.get().getLastName());
            response.put("email", user.get().getEmail());

            System.out.println("✅ Login successful, returning JWT token");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("❌ Authentication failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            System.out.println("👤 Registration attempt for: " + user.getEmail());
            
            // Encode password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = userService.createUser(user);
            
            // Generate JWT token for auto-login
            final String jwt = jwtUtil.generateToken(createdUser.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("userId", createdUser.getId());
            response.put("message", "User registered successfully");

            System.out.println("✅ Registration successful for: " + user.getEmail());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("❌ Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}