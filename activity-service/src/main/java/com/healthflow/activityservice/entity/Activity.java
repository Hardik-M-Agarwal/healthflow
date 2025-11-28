package com.healthflow.activityservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private Double calories;
    
    @Column(nullable = false)
    private String category;
    
    @Column(name = "activity_date", nullable = false)
    private LocalDateTime activityDate;
    
    @Column(nullable = false)
    private String type; // BURN or INTAKE

    public Activity() {
        this.activityDate = LocalDateTime.now();
    }

    public Activity(Long userId, String description, Double calories, String category, String type) {
        this.userId = userId;
        this.description = description;
        this.calories = calories;
        this.category = category;
        this.type = type;
        this.activityDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getCalories() { return calories; }
    public void setCalories(Double calories) { this.calories = calories; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDateTime getActivityDate() { return activityDate; }
    public void setActivityDate(LocalDateTime activityDate) { this.activityDate = activityDate; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    @PrePersist
    protected void onCreate() {
        if (activityDate == null) {
            activityDate = LocalDateTime.now();
        }
    }

    @Override
    public String toString() {
        return "Activity{id=" + id + ", userId=" + userId + ", description='" + description + "', calories=" + calories + "}";
    }
}