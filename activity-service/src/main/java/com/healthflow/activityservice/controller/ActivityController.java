package com.healthflow.activityservice.controller;

import com.healthflow.activityservice.entity.Activity;
import com.healthflow.activityservice.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        Optional<Activity> activity = activityService.getActivityById(id);
        return activity.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        return activityService.createActivity(activity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, 
                                                       @RequestBody Activity activityDetails) {
        Activity updatedActivity = activityService.updateActivity(id, activityDetails);
        return updatedActivity != null ? ResponseEntity.ok(updatedActivity) 
                                         : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id) {
        boolean deleted = activityService.deleteActivity(id);
        return deleted ? ResponseEntity.ok().build() 
                      : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public List<Activity> getUserActivities(@PathVariable Long userId) {
        return activityService.getUserActivities(userId);
    }

    @GetMapping("/user/{userId}/calories")
    public Double calculateUserCalories(@PathVariable Long userId) {
        return activityService.calculateUserCalories(userId);
    }

    @GetMapping("/user/{userId}/category/{category}")
    public List<Activity> getActivitiesByCategory(@PathVariable Long userId, 
                                                     @PathVariable String category) {
        return activityService.getActivitiesByCategory(userId, category);
    }
}