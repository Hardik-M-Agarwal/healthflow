package com.healthflow.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
        System.out.println("✅ User Service started successfully!");
        System.out.println("📍 Server running on: http://localhost:8081");
        System.out.println("📚 Available Endpoints:");
        System.out.println("   GET    http://localhost:8081/api/users/health");
        System.out.println("   POST   http://localhost:8081/api/users");
        System.out.println("   GET    http://localhost:8081/api/users");
        System.out.println("   GET    http://localhost:8081/api/users/{id}");
        System.out.println("   PUT    http://localhost:8081/api/users/{id}/calorie-goal?goal=2000");
    }
}