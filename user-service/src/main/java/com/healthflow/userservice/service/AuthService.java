package com.healthflow.userservice.service;

import com.healthflow.userservice.entity.User;
import com.healthflow.userservice.repository.UserRepository;
import com.healthflow.userservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, String> register(User user) {
        System.out.println("Registering user: " + user.getEmail());
        System.out.println("Password received: " + (user.getPassword() != null ? "[PRESENT]" : "[NULL]"));
        
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User already exists with this email");
        }

        // Check if password is not null before encoding
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        
        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "User registered successfully");
        response.put("userId", savedUser.getId().toString());
        response.put("firstName", savedUser.getFirstName());
        response.put("lastName", savedUser.getLastName());
        response.put("email", savedUser.getEmail());
        return response;
    }

    public Map<String, String> login(String email, String password) {
        System.out.println("Login attempt for email: " + email);
        
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            System.out.println("User not found: " + email);
            throw new RuntimeException("Invalid email or password");
        }

        User user = userOptional.get();
        System.out.println("User found: " + user.getEmail());

        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("Password mismatch for user: " + email);
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        System.out.println("Login successful, token generated for: " + email);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Login successful");
        response.put("userId", user.getId().toString());
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("email", user.getEmail());
        return response;
    }
}