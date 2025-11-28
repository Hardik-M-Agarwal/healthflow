package com.healthflow.userservice.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    private String firstName;
    private String lastName;
    private Double dailyCalorieGoal;
    private Double weightGoal;

    public User() {}

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    // Use @JsonProperty for password - allows setting but not getting in responses
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public Double getDailyCalorieGoal() { return dailyCalorieGoal; }
    public void setDailyCalorieGoal(Double dailyCalorieGoal) { this.dailyCalorieGoal = dailyCalorieGoal; }
    
    public Double getWeightGoal() { return weightGoal; }
    public void setWeightGoal(Double weightGoal) { this.weightGoal = weightGoal; }

    @Override
    public String toString() {
        return "User{id=" + id + ", email='" + email + "', name='" + firstName + " " + lastName + "'}";
    }
}