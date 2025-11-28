package com.healthflow.activityservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ActivityServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ActivityServiceApplication.class, args);
        
        // Custom startup message
        System.out.println("\n" +
            "✅ Activity Service started successfully!\n" +
            "📍 Server running on: http://localhost:8082\n" +
            "📚 Available Endpoints:\n" +
            "   GET    http://localhost:8082/api/activities\n" +
            "   GET    http://localhost:8082/api/activities/{id}\n" +
            "   POST   http://localhost:8082/api/activities\n" +
            "   PUT    http://localhost:8082/api/activities/{id}\n" +
            "   DELETE http://localhost:8082/api/activities/{id}\n" +
            "   GET    http://localhost:8082/api/activities/user/{userId}\n" +
            "   GET    http://localhost:8082/api/activities/user/{userId}/calories\n" +
            "   GET    http://localhost:8082/api/activities/user/{userId}/category/{category}"
        );
    }
}